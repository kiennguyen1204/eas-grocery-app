module.exports = {
  root: true,
  extends: ['expo', 'plugin:react/jsx-runtime', 'prettier'],
  plugins: ['prettier'],
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
