export default class EasyLogin {
    async command(user, userValue, pass, passValue, button) {
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
    }
}