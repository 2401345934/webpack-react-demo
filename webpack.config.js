const path = require('path')
const development = require('./config/webpack.dev.config')
const production = require('./config/webpack.prod.config')
const images = require('./config/webpack.image.config')
const scripts = require('./config/webpack.script.config')
const styles = require('./config/webpack.styles.config')
// 生成 htmlWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// fork 线程 check ts type
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// eslint 优化 plugins
const ESLintPlugin = require('eslint-webpack-plugin')
// 构建时间
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()
// 压缩 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 性能分析
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default
// 压缩
const CompressionPlugin = require('compression-webpack-plugin')
// build 前 清理 dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 合并配置
const { merge } = require('webpack-merge')

const alias = {
  '@': path.resolve(__dirname, 'src'),
  '@globalConfig': path.resolve(__dirname, 'config/globalConfig')
}

const config = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
    alias
  },
  entry: path.join(__dirname, 'src', 'app.tsx'),
  // contenthash 内容变了才会更新
  output: {
    filename: '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 清除 dist
    new CleanWebpackPlugin(),
    // htmlWebpackPlugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'head'
    }),
    // fork ts 检查
    new ForkTsCheckerWebpackPlugin(),
    // eslint plugin
    new ESLintPlugin(),
    // 压缩 css
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' }),
    // 计算性能
    new StatoscopeWebpackPlugin(),
    // 压缩
    new CompressionPlugin()
  ],
  module: {
    rules: [...images, ...scripts, ...styles]
  }
}

// 环境配置
const envConfig = {
  development,
  production
}

module.exports = function (e, v) {
  return merge(config, envConfig[v.mode])
}
