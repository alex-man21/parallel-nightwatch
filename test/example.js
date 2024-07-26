const {Target, VisualGridRunner, Eyes, Configuration, BrowserType} = require('@applitools/eyes-nightwatch')
module.exports = {
    'Example Test': function(browser) {
        // let runner = new VisualGridRunner( { testConcurrency: 10 });

        browser
            .url(`https://nightwatchjs.org/`)
            .eyesCheck(Target.window().fully().withName('nightwatch').layoutRegions([`#resize`, `[data-test-id="Sale"]`, `#testing`]).layoutBreakpoints(true, {reload: true}))
            .end()
    }
}
