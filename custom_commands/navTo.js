export default class NavTo {
    async command(object) {
        return browser
            .waitForElementVisible(object)
            .click(object)
    }
}