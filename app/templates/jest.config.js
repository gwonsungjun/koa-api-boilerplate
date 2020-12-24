module.exports = {
  testEnvironment: 'node',
  globalSetup: '<rootDir>/test/jest.global.js',
  globalTeardown: '<rootDir>/test/jest.teardown.js',
  modulePaths: ['<rootDir>/src/', '<rootDir>/test/'],
  transform: { '^.+\\.(js)?$': 'babel-jest' },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    'infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
    'common/(.*)': '<rootDir>/src/common/$1',
    'domain/(.*)': '<rootDir>/src/domain/$1',
    'web/(.*)': '<rootDir>/src/web/$1',
  },
  silent: true,
  verbose: true,
}
