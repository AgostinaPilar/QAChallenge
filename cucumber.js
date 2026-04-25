module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['steps/**/*.ts', 'support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:reports/cucumber-report.html'],
  },
};
