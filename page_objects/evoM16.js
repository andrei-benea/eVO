import { credentials } from "../tests_input/credentials";

export default class EvoM16 {
    url = 'https://check-evo-m16.x3.net/regulation/m16';
    elements = {
        loggedInUser: '[class="px-3 text-white"]',
        logoutButton: '[class="btn btn-sm btn-blue"]:nth-child(3)',
        navPatientsButton: '[class="d-flex align-items-center px-3 menu-item"]:nth-child(6)',
        navDoctorsButton: '[class="d-flex align-items-center px-3 menu-item"]:nth-child(7)',
        navActiveButton: '[class="d-flex align-items-center px-3 menu-item active-item"]',
        navInactiveButton: '[class="d-flex align-items-center px-3 menu-item"]',
        patientsAddNewButton: '[class="d-flex align-items-center bg-blue"] [class="px-4"]:nth-child(2)',
        newPatientFormContainer: '[class="container-fluid border border-blue py-4 mb-3 ng-untouched ng-pristine ng-invalid"]',
        newPatientFormContainerLabel: '[class="text-blue font-size-28"]',
        newPatientFormNoFeeButton: '[for="no_fee"]',
        newPatientFormHasFeeButton: '[for="has_fee"]',
        newPatientFormMaleButton: '[for="male"]',
        newPatientFormFemaleButton: '[for="female"]',
        newPatientFormFirstNameInput: '[placeholder="Vorname"]',
        newPatientFormLastNameInput: '[placeholder="Nachname"]',
        newPatientFormCalendarIcon: '[class="fe fe-calendar"]',
    };
    async verifyLogin() {
        return browser
            .waitForElementVisible(this.elements.loggedInUser)
            .expect.element(this.elements.loggedInUser).text.toContain(credentials.evo.firstName + ' ' + credentials.evo.lastName)
    };
    async createPatient() {
        return browser
            .clickVisible(this.elements.navPatientsButton)
            .clickVisible(this.elements.patientsAddNewButton)
            .waitForElementVisible(this.elements.newPatientFormContainer)
            .expect.element(this.elements.newPatientFormContainerLabel).text.toContain('Patientendaten erfassen')
            .clickVisible(this.elements.newPatientFormHasFeeButton)
            .clickVisible(this.elements.newPatientFormNoFeeButton)
            .clickVisible(this.elements.newPatientFormFemaleButton)
            .clickVisible(this.elements.newPatientFormMaleButton)
            .setValueVisible(this.elements.newPatientFormFirstNameInput, 'Auto')
            .setValueVisible(this.elements.newPatientFormLastNameInput, 'Tester')
    }
    async logoutUser() {
        return browser
            .clickVisible(this.elements.logoutButton)
    }
}