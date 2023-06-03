// 并行压缩
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules|package\.json/,
  },
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true, // 解决BrowserRouter路由跳转之后刷新浏览器按钮报404的情况
  },
  // // 按需编译
  experiments: {
    //     asyncWebAssembly: 根据更新的规范支持新的 WebAssembly ，它使 WebAssembly 模块成为异步模块。experiments.futureDefaults设置为 时默认启用true。
    // layers：启用模块和块层。
    // syncWebAssembly: 像 webpack 4 一样支持旧的 WebAssembly。
    // topLevelAwait: 支持Top Level Await Stage 3 proposal，它使模块await在顶层使用时成为异步模块。experiments.futureDefaults设置为 时默认启用true。
    layers: true,
    // import仅在使用时编译入口点和动态。它可以用于 Web 或 Node.js
    // lazyCompilation: true,
  },
  // 并行压缩
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false,
    concatenateModules: false,
    usedExports: false,
    minimizer: [
      new TerserPlugin({
        parallel: 2, // number | boolean
      }),
    ],
  },
}
