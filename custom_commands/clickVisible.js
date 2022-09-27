export default class ClickVisible {
    async command(button) {
        return browser
            .waitForElementVisible(button, async () => {
                console.log('Element visible!')
            })
            .click(button, async () => {
                console.log('clicking..')
            })
    }
}