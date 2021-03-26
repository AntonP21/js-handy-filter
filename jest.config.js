module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^conditions/(.*)': '<rootDir>/src/conditions/$1',
    '^filter/(.*)': '<rootDir>/src/filter/$1',
    '^conditions$': '<rootDir>/src/conditions/index.ts',
    '^filter$': '<rootDir>/src/filter/index.ts',
    '^lib/(.*)': '<rootDir>/src/lib/$1',
  },
  modulePathIgnorePatterns: ['build/', 'devBuild/', '<rootDir>/src/.*/?__tests__/.*/?lib/'],
};
