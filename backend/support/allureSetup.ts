import { Before } from '@cucumber/cucumber';

const { setGlobalTestRuntime, MessageTestRuntime } = require('allure-js-commons/sdk/runtime');
const { ALLURE_RUNTIME_MESSAGE_CONTENT_TYPE } = require('allure-js-commons/sdk/reporter');

class CucumberAllureRuntime extends MessageTestRuntime {
  private attachFn: Function;

  constructor(attachFn: Function) {
    super();
    this.attachFn = attachFn;
  }

  async sendMessage(message: unknown) {
    this.attachFn(JSON.stringify(message), ALLURE_RUNTIME_MESSAGE_CONTENT_TYPE);
    await Promise.resolve();
  }
}

Before(async function () {
  await setGlobalTestRuntime(new CucumberAllureRuntime(this.attach.bind(this)));
});
