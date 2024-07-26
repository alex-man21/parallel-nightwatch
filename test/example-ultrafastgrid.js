const {Target} = require('@applitools/eyes-nightwatch')
module.exports = {
    'Ultrafast Test': function(browser) {
        browser
            .url('https://demo.applitools.com')
            .eyesCheck(Target.window().fully().withName('Login Window'))
            .click('#log-in')
            .eyesCheck(Target.window().fully().withName('App Window'))
            .end()
    }
}
