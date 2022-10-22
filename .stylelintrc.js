module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'indentation': 4,
    'selector-max-id': 1,
    'string-quotes': 'single',
    'declaration-block-no-redundant-longhand-properties': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'mixin-content', 'define-mixin'],
      },
    ],
  },
};
