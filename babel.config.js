module.exports = {
  plugins: [
    [
      require('babel-auto-try-async'),
      {
        exclude: [], // 默认值 ['node_modules']
        include: ['src/utils/index.ts'], // 默认值 []
        customLog: '', // 默认值 'Error'
      },
    ],
  ],
}
