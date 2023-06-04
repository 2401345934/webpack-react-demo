module.exports = [
  {
    test: /\.(gif|png|jpe?g)$/i,
    // type 属性适用于 Webpack5，旧版本可使用 file-loader
    exclude: /node_modules/,
    type: 'asset/resource',
    use: [
      {
        loader: 'image-webpack-loader',
        options: {
          // 只在生产环境开启
          disable: process.env.NODE_ENV === 'development',
          // jpeg 压缩配置
          mozjpeg: {
            quality: 80,
          },
        },
      },
    ],
  },
  {
    test: /\.(png|jpg)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1024,
        },
      },
    ],
  },
  {
    test: /\.svg$/,
    use: 'file-loader',
  },
]
