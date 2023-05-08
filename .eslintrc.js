export default [
  {
    env: {
      node: true,
      es6: true,
      'jest/globals': true,
      jest: true,
    },
    extends: [
      'airbnb-base',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    plugins: [
      'jest',
    ],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      'linebreak-style': 0,
      'prefer-destructuring': 0,
      'no-param-reassign': [
        'error',
        {
          props: false,
        },
      ],
      'import/extensions': 0,
      'import/prefer-default-export': 0,
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-describe': 'off',
      'jest/valid-expect': 'off',
      'jest/valid-expect-in-promise': 'off',
      'jest/no-standalone-expect': 'off',
    },
  },
];
