const path = require('path')

module.exports = [
  {
    test: [/\.jsx$/, /\.tsx$/, /\.ts$/],
    exclude: /node_modules/,
    use: [
      'thread-loader',
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              '@babel/preset-react',
              {
                runtime: 'automatic'
              }
            ],
            '@babel/preset-typescript'
          ],
          plugins: [
            [
              'react-css-modules',
              {
                context: path.join(__dirname, '..'),
                exclude: 'node_modules',
                filetypes: {
                  '.less': {
                    syntax: 'postcss-less'
                  }
                }
              }
            ]
          ]
        }
      }
    ]
  }
]
