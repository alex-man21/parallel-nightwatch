const {Target} = require('@applitools/eyes-nightwatch')
module.exports = {
    'Ultrafast Test': function(browser) {
        browser
            .url('https://www.zappos.com/c/examplemelodysymphony')
            .eyesCheck(
                Target
                .window()
                .fully()
                .withName('zappos')
            )
            .end()
    }
}