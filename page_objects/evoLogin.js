export default class EvoLogin {
    url = 'https://check-evo-m16.x3.net/login';
    elements = {

    };
    async initPage() {
        return browser
            .maximizeWindow()
            .url(this.url)
            .assert.urlContains(this.url)
    }
}