import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const run = (command, args = []) =>
  execFileSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();

const sha256 = (file) =>
  createHash("sha256").update(readFileSync(join(root, file))).digest("hex");

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });

const packageVersion = (name) => {
  const packageFile = join(root, "node_modules", name, "package.json");
  return existsSync(packageFile)
    ? JSON.parse(readFileSync(packageFile, "utf8")).version
    : "not installed";
};

const head = run("git", ["rev-parse", "HEAD"]);
const commitRef = process.env.COMMIT_REF || "not set";

console.log("=== NETLIFY DIAGNOSTICS ===");
console.log(`CONTEXT=${process.env.CONTEXT || "not set"}`);
console.log(`BRANCH=${process.env.BRANCH || "not set"}`);
console.log(`HEAD_BRANCH=${process.env.HEAD || "not set"}`);
console.log(`COMMIT_REF=${commitRef}`);
console.log(`GIT_HEAD=${head}`);
console.log(`NODE=${process.version}`);
console.log(`NPM=${run(process.platform === "win32" ? "npm.cmd" : "npm", ["--version"])}`);

for (const name of ["vite", "rollup", "sharp", "postcss", "vite-plugin-image-optimizer"]) {
  console.log(`${name.toUpperCase()}=${packageVersion(name)}`);
}

if (commitRef !== "not set" && commitRef !== head) {
  console.warn(`WARNING: Netlify COMMIT_REF ${commitRef} does not match Git HEAD ${head}`);
}

console.log("=== SOURCE CHECK ===");
console.log(`INDEX_SHA256=${sha256("index.html")}`);
console.log(run("git", ["status", "--short"]) || "working tree clean");

const articleSources = readdirSync(join(root, "nyheder"))
  .filter((name) => name.endsWith(".html"))
  .sort();
console.log(`ARTICLE_SOURCES=${articleSources.join(",")}`);

console.log("=== BUILD ===");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const build = spawnSync(npm, ["run", "build"], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
});

if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

console.log("=== DIST CHECK ===");
const requiredOutputs = [
  "dist/index.html",
  ...articleSources.map((name) => `dist/nyheder/${name}`),
];

const staffSources = walk(join(root, "public", "img", "personale"));
for (const source of staffSources) {
  requiredOutputs.push(join("dist", relative(join(root, "public"), source)));
}

const missing = requiredOutputs.filter((file) => !existsSync(join(root, file)));
if (missing.length > 0) {
  console.error(`Missing expected build output:\n${missing.join("\n")}`);
  process.exit(1);
}

const sourceIndex = readFileSync(join(root, "index.html"), "utf8");
const distIndex = readFileSync(join(root, "dist", "index.html"), "utf8");
const staffReferences = [...sourceIndex.matchAll(/\/img\/personale\/[^"'<>\s]+/g)].map(
  ([path]) => path,
);
const missingReferences = [...new Set(staffReferences)].filter(
  (path) => !existsSync(join(root, "dist", path)),
);

if (missingReferences.length > 0) {
  console.error(`Missing referenced staff images:\n${missingReferences.join("\n")}`);
  process.exit(1);
}

for (const article of articleSources) {
  if (!distIndex.includes(`/nyheder/${article}`)) {
    console.warn(`WARNING: dist/index.html does not link to /nyheder/${article}`);
  }
}

console.log(`DIST_INDEX_SHA256=${sha256("dist/index.html")}`);
console.log(`VERIFIED_ARTICLES=${articleSources.length}`);
console.log(`VERIFIED_STAFF_IMAGES=${staffSources.length}`);

console.log("=== DIST FILES ===");
for (const file of walk(join(root, "dist")).sort()) {
  const size = statSync(file).size;
  console.log(`${relative(root, file)}\t${size}`);
}
