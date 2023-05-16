module.exports = {
  root: true,
  plugins: ['stylelint-less', 'stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'value-no-vendor-prefix': [true, { ignoreValues: ['box'] }],
    'no-empty-source': null, // 不允许空的来源
    'unit-no-unknown': null, // 禁止未知的单位
    'selector-class-pattern': null, // 指定类选择器的模式
    'function-url-quotes': null, // 要求或禁止 url 引号
    'no-descending-specificity': null, // 不容许较低特异性的选择器呈现在笼罩较高特异性的选择器之后
    'at-rule-no-unknown': null, // 不容许未知的规定
    'keyframes-name-pattern': null, // 指定关键帧名称的模式
    'no-invalid-double-slash-comments': null, // 不允许双斜杠注释(/ /…)不支持CSS
    'custom-property-pattern': null,
    'font-family-no-missing-generic-family-keyword': null,
    'function-no-unknown': null,
    'selector-type-no-unknown': [
      // 禁止未知类型选择器
      true,
      {
        ignoreTypes: ['/^page/', 'rich-text', 'official-account', 'swiper'],
      },
    ],
  },
  ignoreFiles: [
    'node_modules/**/*',
    'dist/**/*',
    '*.js',
    '*.ts',
    '*.json',
    'src/styles/*',
  ],
}
