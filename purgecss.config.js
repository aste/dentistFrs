// purgecss.config.js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  css: ["./src/**/*.css"],
  output: "./src/css/",
  safelist: {
    standard: [/swiper-/, /modal-/, /show/, /active/, /collapsed/, /collapse/],
  },
};
