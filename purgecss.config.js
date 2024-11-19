export default {
  content: ["./src/index.html", "./src/js/*.js"],
  css: ["./src/css/*.css", "./src/assets/vendor/**/*.css"],
  output: "./src/css/",
  safelist: [/swiper-/, /modal-/, /show/, /active/, /collapsed/, /collapse/],
};
