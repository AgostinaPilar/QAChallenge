module.exports = {
  default: {
    paths: ['frontend/features/**/*.feature'],
    require: ['frontend/steps/**/*.ts', 'frontend/support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      './frontend/support/formatters/prettyStepFormatter.js',
      'allure-cucumberjs/reporter:reports/allure-output.txt',
    ],
    formatOptions: {
      resultsDir: 'allure-results',
    },
  },
};
