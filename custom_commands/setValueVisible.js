export default class SetValueVisible {
    async command(input, string) {
        return browser
            .waitForElementVisible(input)
            .setValue(input, string, async () => {
                console.log('Setting value...')
            })
    }
}