module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    parser: 'babel-eslint',
    requireConfigFile: false,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.tsx', '*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
}
