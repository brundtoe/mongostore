module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'jest/globals': true,
    'mongo': true
  },
  'plugins': ['jest'],
  'extends': ['eslint:recommended','plugin:jest/recommended'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'browser': true,
    'page': true,
    'context': true,
  },
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'no-console': 'off',
  },
}
