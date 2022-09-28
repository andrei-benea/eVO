export default class ClickVisible {
    async command(input, string) {
        return browser
            .waitForElementVisible(input)
            .setValue(input, string, async () => {
                console.log('Setting value...')
            })
    }
}