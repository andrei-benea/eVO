export default class SwitchTab {
    async command(i) {
        return browser
            .pause(5000)
            .windowHandles(async (result) => {
                console.log(result)
                browser.switchToWindow(result.value[i])
            })
    }
}
