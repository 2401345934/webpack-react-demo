module.exports = [
  {
    test: [/\.less$/, /\.css$/],
    use: [
      'thread-loader',
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      'less-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            // 添加 autoprefixer 插件
            plugins: [require('autoprefixer')]
          }
        }
      }
    ]
  }
]
