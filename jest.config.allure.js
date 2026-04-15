module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js', '**/__tests__/**/*.unit.test.js'],
  reporters: [
    'default',
    ['allure-jest', { resultsDir: './allure-results' }],
  ],
};
