const sharedExtends = [
  'plugin:prettier/recommended',
  'plugin:import/typescript',
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
