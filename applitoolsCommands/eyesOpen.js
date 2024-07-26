'use strict'
const {
  Eyes, 
  Configuration, 
  BrowserType, 
  ConsoleLogHandler, 
  FileLogHandler, 
  BatchInfo} = require('@applitools/eyes-nightwatch')

module.exports = class EyesOpen {
  async command(appName, testName, viewportSize, eyesRunner) {
    
    let eyes = this.client.api.globals.__eyes = new Eyes(
      eyesRunner
    );
    let config = new Configuration();
        
    config.addBrowsers(
            { name: BrowserType.CHROME, width: 820, height: 600 },
            // { name: BrowserType.CHROME, width: 350, height: 768 },
    )
    config.setApiKey(process.env.APPLITOOLS_API_KEY);
    let batchName = `nightwatch_${new Date().toLocaleString().split(',')[0]}`
    let batchInfo = new BatchInfo(batchName);
    batchInfo.setId(batchName);

    config.setBatch(batchInfo);

    eyes.setConfiguration(config);
    eyes.setLogHandler(new FileLogHandler(true, eyes.log, false));
    
    await eyes.open(this.client.api, appName, testName, viewportSize);


  }
}

