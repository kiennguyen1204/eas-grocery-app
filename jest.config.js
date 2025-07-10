module.exports = {
  preset: 'jest-expo',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^test-utils$': '<rootDir>/test-utils.tsx',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'services/**/*.{ts,tsx}',
    'utils/**/*.{ts,tsx}',
    '!**/*.stories.{ts,tsx}',
    '!components/icons/*.{ts,tsx}',
    '!components/*.ts',
    '!components/**/*.ts',
    '!services/index.ts',
    '!hooks/index.ts',
    '!utils/index.ts',
  ],
  setupFilesAfterEnv: ['./jest-setup.ts'],
};
