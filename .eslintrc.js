module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // Add custom rules here if needed
    'no-unused-vars': 'warn', // Warn about unused variables
    'no-console': 'off', // Allow console.log
  },
};