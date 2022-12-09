import { credentials } from '../tests_input/credentials';
import  Utils  from '../custom_commands/utils';

const utils = new Utils();

export default class EvoLoginPage {
    url = 'https://check-evo-m16.x3.net/login';
    elements = {
        loginLabel: '[class="text-white pl-3"]',
        usernameInput: '[name="username"]',
        passwordInput: '[name="password"]',
        loginButton: '[class="btn btn-white btn-login"]',
        loggedInUser: '[class="px-3 text-white"]',
        logoutButton: '[class="btn btn-sm btn-blue"]:nth-child(5)',
    };
    async checkRequest() {
        return browser
            .captureNetworkRequests((requestParams) => {
                console.log('url: ' + requestParams.request.url)
                console.log('method: ' + requestParams.request.method)
            })
    };
    async saveEvoNr() {
        return browser
            .saveEvoNrToFile();
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
    async verifyLogin() {
        return browser
            .waitForElementVisible(this.elements.loggedInUser)
            .expect.element(this.elements.loggedInUser).text.toContain(credentials.evo.firstName + ' ' + credentials.evo.lastName)
    };
    async logoutUser() {
        return browser
            .clickVisible(this.elements.logoutButton)
    };
    async verifyLogout() {
        return browser
            .expect.element(this.elements.loginLabel).text.toContain('HMM.eVO Login')
    }
}