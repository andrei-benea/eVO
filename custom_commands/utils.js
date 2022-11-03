export default class Utils {
    async navTo(object) {
        return browser
            .waitForElementVisible(object)
            .click(object)
    };
    async switchTab(i) {
        return browser
            .pause(5000)
            .windowHandles(async (result) => {
                console.log(result)
                browser.switchToWindow(result.value[i])
            })
    };
    async setValueVisible(input, string) {
        return browser
            .waitForElementVisible(input)
            .setValue(input, string, async () => {
                console.log('Setting value...')
            })
    };
    async clickVisible(button) {
        return browser
            .waitForElementVisible(button)
            .click(button, async () => {
                console.log('Clicking..')
            })
    };
    async auth(user, userValue, pass, passValue, button) {
        return browser
            .setValue(user, userValue, async () => {
                console.log(userValue, 'Setting username..')
            })
            .setValue(pass, passValue, async () => {
                console.log(passValue, 'Setting password..')
            })
            .click(button, async () => {
                console.log('Logging in...')
            })
    };
}