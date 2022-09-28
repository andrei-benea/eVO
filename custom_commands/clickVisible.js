export default class ClickVisible {
    async command(button) {
        return browser
            .waitForElementVisible(button)
            .click(button, async () => {
                console.log('Clicking..')
            })
    }
}