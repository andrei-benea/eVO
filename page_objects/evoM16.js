import { credentials } from "../tests_input/credentials";

export default class EvoM16 {
    url = 'https://check-evo-m16.x3.net/regulation/m16';
    elements = {
        loggedInUser: '[class="px-3 text-white"]',
        logoutButton: '[class="btn btn-sm btn-blue"]:nth-child(3)',
        navPatientsAdmButton: '[class="d-flex align-items-center px-3 menu-item"]:nth-child(6)',
        navDoctorsAdmButton: '[class="d-flex align-items-center px-3 menu-item"]:nth-child(7)',
        patientsAddNewButton: '[class="d-flex align-items-center bg-blue"] [class="px-4"]:nth-child(2)',
        patientsNewFormContainer: '[class="container-fluid border border-blue py-4 mb-3 ng-untouched ng-pristine ng-invalid"]',
        patientsNewFormContainerLabel: '[class="text-blue font-size-28"]',
        navActiveButton: '[class="d-flex align-items-center px-3 menu-item active-item"]',
        navInactiveButton: '[class="d-flex align-items-center px-3 menu-item"]'
    };
    async verifyLogin() {
        return browser
            .waitForElementVisible(this.elements.loggedInUser)
            .expect.element(this.elements.loggedInUser).text.toContain(credentials.evo.firstName + ' ' + credentials.evo.lastName)
    };
    async createPatient() {
        return browser
            .click(this.elements.navPatientsAdmButton)
            .click(this.elements.patientsAddNewButton)
            .waitForElementVisible(this.elements.patientsNewFormContainer)
            .expect.element(this.elements.patientsNewFormContainerLabel).text.toContain('Patientendaten erfassen')
    }
    async logoutUser() {
        return browser
            .click(this.elements.logoutButton)
    }
}