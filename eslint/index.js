const path = require('path')

const sharedExtends = [
  'eslint-config-airbnb-base',
  'plugin:prettier/recommended',
]
const sharedTestExtends = ['plugin:jest/all', 'plugin:jest-formatting/strict']

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  extends: [...sharedExtends],
  plugins: ['prefer-arrow', 'jest-formatting', 'jest'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [process.cwd(), path.resolve(__dirname, './pacjage.json')],
      },
      // resolves to [<root>/packages/app, <root>/packages/jest-config]
    ],
    'import/no-unresolved': 'off',
    // 'max-lines': ['error', { max: 100 }],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [...sharedExtends],
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        'jest/prefer-expect-assertions': 'off',
      },
      extends: [...sharedTestExtends, ...sharedExtends],
    },
  ],
}
