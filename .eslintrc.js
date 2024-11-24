module.exports = {
  extends: ['@andre-brdoch/eslint-config'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
  },
  // unignore our custom dot files
  ignorePatterns: ['!.eslintrc.js', '!.prettierrc.js'],
  rules: {
    '@typescript-eslint/no-unused-vars': [2],
    'no-console': [0],
  },
}
