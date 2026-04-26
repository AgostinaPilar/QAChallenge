module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['steps/**/*.ts', 'support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      './support/formatters/prettyStepFormatter.js',
      'allure-cucumberjs/reporter:reports/allure-output.txt',
    ],
    formatOptions: {
      resultsDir: 'allure-results',
    },
  },
};
