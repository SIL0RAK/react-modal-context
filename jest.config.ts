import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: ['<rootDir>/tests/**/*(*.)test.(js|jsx|ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      isolatedModules: true,
    },
  },
  clearMocks: true,
  coverageReporters: [
    'lcov',
    'text',
    'cobertura',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
  ],
};

export default config;
