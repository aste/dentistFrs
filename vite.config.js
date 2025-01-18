import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import cssnano from "cssnano";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
    cssCodeSplit: false,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
      output: {
        manualChunks: {
          vendor: ["bootstrap", "swiper", "glightbox", "flatpickr", "imask"],
        },
        hashCharacters: "base36",
        assetFileNames: ({ name }) => {
          if (/\.(woff|woff2)$/.test(name)) {
            return "assets/fonts/[name][extname]";
          }
          if (/\.(png|jpe?g|gif|webp|svg)$/.test(name)) {
            return "assets/img/[name][extname]";
          }
          if (/\.css$/.test(name)) {
            return "assets/css/[name].[hash][extname]";
          }
          if (/\.webmanifest$/.test(name)) {
            return "[name][extname]";
          }
          return "assets/[ext]/[name][extname]";
        },
        chunkFileNames: "assets/js/[name].[hash].js",
        entryFileNames: "assets/js/[name].[hash].js",
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false,
      },
      format: {
        comments: false,
      },
    },
  },
  publicDir: "public",
  css: {
    postcss: {
      plugins: [
        cssnano({
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              minifyFontValues: { removeQuotes: false },
              discardUnused: true,
              mergeIdents: true,
              reduceIdents: true,
              minifySelectors: true,
            },
          ],
        }),
      ],
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
    open: true,
  },
  plugins: [
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      includePublic: true,
      logStats: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
                removeEmptyAttrs: false,
              },
            },
          },
        ],
      },
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: false,
        quality: 80,
        alphaQuality: 80,
        force: false,
      },
    }),
  ],
});
