module.exports = {
  default: [
    '--require steps/**/*.js',
    '--format progress',
    '--format json:allure-results/cucumber-report.json',
    'features/**/*.feature',
  ].join(' '),
};
