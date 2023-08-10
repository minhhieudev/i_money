module.exports = {
  chainWebpack: (config) => {
    // Thêm trình biên dịch Babel cho tập tin module của chart.js
    config.module
      .rule("chartjs")
      .test(/\.js$/)
      .include.add(/node_modules\/chart.js/)
      .end()
      .use("babel-loader")
      .loader("babel-loader")
      .end();
  },
};
