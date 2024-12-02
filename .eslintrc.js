module.exports = {
  extends: ['@andre-brdoch/eslint-config'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
  },
  globals: {
    NodeJS: true,
  },
  ignorePatterns: [
    'day-xx',
    // unignore dot files
    '!.eslintrc.js',
    '!.prettierrc.js',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': [2],
    '@typescript-eslint/no-unused-vars': [2],
    'no-console': [0],
  },
}
