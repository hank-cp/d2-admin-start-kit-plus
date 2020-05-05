module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/require-v-for-key': 'off',
    'lines-between-class-members': 'off',
    'prefer-const': 'off',
    'array-bracket-spacing': ['warn', 'never'],
    'quote-props': ['warn', 'as-needed'],
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'indent': ['error', 2, {
      'FunctionDeclaration': {
        parameters: 'first'
      },
      'FunctionExpression':{
        parameters: 'first'
      },
      'SwitchCase': 1
    }],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
