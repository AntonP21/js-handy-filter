module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^conditions/(.*)': '<rootDir>/src/conditions/$1',
    '^conditions$': '<rootDir>/src/conditions/index.ts',
    '^condition-parser/(.*)': '<rootDir>/src/condition-parser/$1',
    '^condition-parser$': '<rootDir>/src/condition-parser/index.ts',
    '^filter/(.*)': '<rootDir>/src/filter/$1',
    '^filter$': '<rootDir>/src/filter/index.ts',
    '^lib/(.*)': '<rootDir>/src/lib/$1',
  },
  modulePathIgnorePatterns: ['build/', 'devBuild/', '<rootDir>/src/.*/?__tests__/.*/?lib/'],
};
