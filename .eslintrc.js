module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
  ],
  env: {
    node: true,
    browser: true,
    es6: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  overrides: [
    // React/UI specific rules
    {
      files: ['ui/**/*.{ts,tsx}'],
      plugins: ['react', 'react-hooks'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
      ],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-console': 'warn',
      },
    },
    // API specific rules
    {
      files: ['api/**/*.ts'],
      rules: {
        'no-console': 'off', // Allow console logs in API
      },
    },
  ],
  ignorePatterns: [
    'dist/',
    'build/',
    'node_modules/',
    '.eslintrc.js',
  ],
};