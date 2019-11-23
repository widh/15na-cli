module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  plugins: [],
  extends: [
    'react-app',
    'airbnb',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
  },
};
