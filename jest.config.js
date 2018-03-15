module.exports = {
  transform: {
    '.*': '<rootDir>/node_modules/babel-jest',
  },
  moduleFileExtensions: [
    'es6',
    'js',
    'jsx',
  ],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/src/tests/__mock__/imgMock.js',
  },
  collectCoverage: true,

  coverageCollector: "jest-babel-istanbul",

  unmockedModulePathPatterns: [
    'react',
    'enzyme',
  ],
  globals: {
    window: true,
    document: true,
  },

  setupFiles: [
    "<rootDir>/src/setupTests.js",
  ],

  bail: true,
  verbose: true,

  roots: [
    'src/',
  ],
  collectCoverageFrom: [
    '**/src/components/**'],
};

