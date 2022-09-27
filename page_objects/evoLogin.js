import { credentials } from '../tests_input/credentials';

export default class EvoLoginPage {
    url = 'https://check-evo-m16.x3.net/login';
    elements = {
        loginLabel: '[class="text-white pl-3"]',
        usernameInput: '[name="username"]',
        passwordInput: '[name="password"]',
        loginButton: '[class="btn btn-white btn-login"]'
    };
    async initPage() {
        return browser
            .maximizeWindow()
            .url(this.url)
            .assert.urlContains(this.url)
    };
    async evoLogin() {
        return browser
            .auth(this.elements.usernameInput, credentials.evo.username, this.elements.passwordInput, credentials.evo.password, this.elements.loginButton);
    };
    async verifyLogout() {
        return browser
            .expect.element(this.elements.loginLabel).text.toContain('HMM.eVO Login')
    }
}