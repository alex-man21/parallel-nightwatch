const { VisualGridRunner, BatchInfo } = require("@applitools/eyes-nightwatch");

const vgRunner = new VisualGridRunner({ testConcurrency: 15 });
console.log(`GLOBAL`);
// console.log(vgRunner);
module.exports = {
    // this controls whether to abort the test execution when an assertion failed and skip the rest
    // it's being used in waitFor commands and expect assertions
    abortOnAssertionFailure: true,
  
    // this will overwrite the default polling interval (currently 500ms) for waitFor commands
    // and expect assertions that use retry
    waitForConditionPollInterval: 500,
  
    // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
    // expect assertions
    waitForConditionTimeout: 5000,
  
    // this will cause waitFor commands on elements to throw an error if multiple
    // elements are found using the given locate strategy and selector
    throwOnMultipleElementsReturned: false,
  
    // controls the timeout value for async hooks. Expects the done() callback to be invoked within this time
    // or an error is thrown
    asyncHookTimeout: 60000,
  
    // controls the timeout value for when running async unit tests. Expects the done() callback to be invoked within this time
    // or an error is thrown
    unitTestsTimeout: 2000,
  
    // controls the timeout value for when executing the global async reporter. Expects the done() callback to be invoked within this time
    // or an error is thrown
    customReporterCallbackTimeout: 20000,
  
    // Automatically retrying failed assertions - You can tell Nightwatch to automatically retry failed assertions until a given timeout is reached, before the test runner gives up and fails the test.
    retryAssertionTimeout: 1000,
  
    'default': {
      myGlobal: function() {
        return 'I\'m a method';
      }
    },
  
    'test_env': {
      myGlobal: 'test_global',
      beforeEach: function() {
  
      }
    },
  
    async before() {
      console.log(`GLOBAL BEFORE`);
      // done();
    },
  
    async beforeEach(browser, done) {
      await browser.eyesOpen(
        browser.currentTest.module, 
        browser.currentTest.module,
        { width: 1200, height: 800 },
        vgRunner
      );
      await done();
    },
  
    async after(done) {
      console.log('GLOBAL AFTER')
      await done();


      const startTime = new Date();
      console.log(`vgrunner`);
      console.log(vgRunner._getResultsSettings);
      console.log(`Beginning to get Applitools test results at ${startTime.toLocaleString()}.`);
      try {
        let passed = 0;
        let unresolved = 0;
        let failed = 0;
        let exceptions = 0;
        let mismatches = 0;
        let missing = 0;
        let matches = 0;
        let steps = 0;
        let url;

        const testResultsSummary = await vgRunner.getAllTestResults(false);
        // console.log(JSON.stringify(testResultsSummary));

        for (const testResultContainer of testResultsSummary) {
          const testResults = testResultContainer.getTestResults();

          if (testResultContainer.getException() !== null) {
            exceptions++;
          }

          if (testResults.getStatus() !== null) {
            switch (testResults.getStatus()) {
              case 'Failed':
                failed++;
                break;
              case 'Passed':
                passed++;
                break;
              case 'Unresolved':
                unresolved++;
                break;
            }
          }
          console.log(`Passed: ${passed}, Failed: ${failed}, Unresolved: ${unresolved}`);
          matches += testResults.getMatches();
          missing += testResults.getMissing();
          mismatches += testResults.getMismatches();
          steps += testResults.getSteps();
          url = testResults.getUrl();

          let testResultsJSON = JSON.stringify(testResults);
          console.log(testResultsJSON);

        }

        const batchResultsSummary = {
          Passed: passed,
          Unresolved: unresolved,
          Failed: failed,
          Exceptions: exceptions,
          Mismatches: mismatches,
          Missing: missing,
          Matches: matches,
          Url: url
        };

        console.log(`BatchResults summary:`);
        console.log(batchResultsSummary);
        // batchStatus(batchResultsSummary);
      } catch (e) {
        console.log('Applitools error while getting batch summary');
        console.log(e);
      }
      const endTime = new Date();
      console.log(`Done with Applitools test results at ${endTime.toLocaleString()}. Took ${endTime.getTime() - startTime.getTime()} ms.`);

      // cb();
    },
  
    async afterEach(browser, done) {
      console.log(`GLOBAL AFTER EACH`);

      // await browser.testGetRunner();
      await browser.eyesClose(false); 

      await done();
    },
  
    reporter(results, cb) {
      cb();
    },

    eyesRunner: vgRunner
  };
