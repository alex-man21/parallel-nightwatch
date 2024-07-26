const {Target} = require('@applitools/eyes-nightwatch')
module.exports = {
    'Eyes Test': function(browser) {
        browser
            .url(`https://help.applitools.com/hc/en-us/articles/360017969812-Visual-Regression-Testing-with-Nightwatch-js-Applitools`)
            .eyesCheck(Target.window().fully().withName('responsive page').layoutRegions([`#resize`, `[data-test-id="Sale"]`, `#testing`]).layoutBreakpoints(true, {reload: true}))
            .end()
    }
}
