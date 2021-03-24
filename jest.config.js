module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^conditions/(.*)': '<rootDir>/src/conditions/$1',
    '^lib/(.*)': '<rootDir>/src/lib/$1',
  },
  modulePathIgnorePatterns: ['build/', '<rootDir>/src/.*/?__tests__/.*/?lib/'],
};
