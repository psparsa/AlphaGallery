module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testEnvironment: 'jest-environment-jsdom',

  // https://stackoverflow.com/a/51174924/3999031
  moduleDirectories: ['node_modules', 'src'],
};
