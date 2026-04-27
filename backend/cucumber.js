module.exports = {
  default: {
    paths: ['backend/features/**/*.feature'],
    require: ['backend/steps/**/*.ts', 'backend/support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      './frontend/support/formatters/prettyStepFormatter.js',
      'allure-cucumberjs/reporter:reports/allure-api-output.txt',
    ],
    formatOptions: {
      resultsDir: 'allure-results-api',
    },
  },
};
