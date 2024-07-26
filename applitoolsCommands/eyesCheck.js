'use strict'
const {Eyes, Target} = require('@applitools/eyes-nightwatch')

module.exports = class EyesCheck {
  async command() {
    await this.client.api.globals.__eyes.check(Target.window().fully());
    let runner = await this.client.api.globals.__eyes.getRunner();
    console.log(runner);


  }
}
