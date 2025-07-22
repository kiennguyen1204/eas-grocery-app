// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    plugins: ['prettier', 'react-compiler'],
    rules: {
      'react-compiler/react-compiler': 'warn',
    },
  },
]);
