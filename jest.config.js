const { resolve } = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const CI = !!process.env.CI;

const ROOT_DIR = __dirname;
const TSCONFIG = resolve(ROOT_DIR, 'tsconfig.json');
const tsconfig = require(TSCONFIG);

const ESM_PACKAGES = ['get-port'];

process.env.LC_ALL = 'en_US';

module.exports = {
  testEnvironment: 'node',
  rootDir: ROOT_DIR,
  restoreMocks: true,
  reporters: ['default'],
  modulePathIgnorePatterns: ['dist', 'fixtures', '.bob'],
  moduleNameMapper: {
    '@graphql-mesh/cross-helpers': '<rootDir>/packages/cross-helpers/node.js',
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
      prefix: `${ROOT_DIR}/`,
    }),
    'formdata-node': '<rootDir>/node_modules/formdata-node/lib/cjs/index.js',
  },
  collectCoverage: false,
  cacheDirectory: resolve(ROOT_DIR, `${CI ? '' : 'node_modules/'}.cache/jest`),
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.mjs?$': 'babel-jest',
    '^.+\\.ts?$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [`node_modules/(?!(${ESM_PACKAGES.join('|')})/)`],
  resolver: 'bob-the-bundler/jest-resolver.js',
};
