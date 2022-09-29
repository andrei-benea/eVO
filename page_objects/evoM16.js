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
        lowHeaderSearchField: '[formcontrolname="term"]',
        lowHeaderSearchFieldInput: '[formcontrolname="term"] > div > div > div > div > input',
        lowHeaderSearchButton: '[class="btn btn-link text-white"]',
        patientsAddNewButton: '[class="d-flex align-items-center bg-blue"] [class="px-4"]:nth-child(2)',
        patientsOverviewEmptyRowLabel: '[class="empty-row"]',
        patientsOverviewDeleteItemButton: '[class="fas fa-trash-alt mr-2 text-blue cursor-pointer"]',
        patientsOverviewDeleteItemConfirmationButton: '[class="btn mx-3 btn-orange"]',
        patientsOverviewPaginationSelectedRange: '[class="datatable-footer-inner selected-count"] [class="d-flex w-100 align-items-center justify-content-between px-4"] > div:nth-child(1)',
        newPatientFormContainer: '[class="container-fluid border border-blue py-4 mb-3 ng-untouched ng-pristine ng-invalid"]',
        newPatientFormContainerLabel: '[class="text-blue font-size-28"]',
        newPatientFormNoFeeButton: '[for="no_fee"]',
        newPatientFormHasFeeButton: '[for="has_fee"]',
        newPatientFormMaleButton: '[for="male"]',
        newPatientFormFemaleButton: '[for="female"]',
        newPatientFormFirstNameInput: '[placeholder="Vorname"]',
        newPatientFormLastNameInput: '[placeholder="Nachname"]',
        newPatientFormDateOfBirthInput: '[placeholder="__.__.____"]',
        newPatientFormCalendarIcon: '[class="fe fe-calendar"]',
        newPatientFormKvnrInput: '[placeholder="KVNR"]',
        newPatientFormCostBearerCombo: '[formcontrolname="costBearer"]',
        newPatientFormCostBearerInput: '[formcontrolname="costBearer"] [class="ng-input"] > input',
        newPatientFormStreetInput: '[placeholder="Straße"]',
        newPatientFormHouseNrInput: '[placeholder="H-Nr."]',
        newPatientFormPostalCodeCombo: '[formcontrolname="zipCode"]',
        newPatientFormPostalCodeInput: '[formcontrolname="zipCode"] [class="ng-input"] > input',
        newPatientFormComboResult: '[class="ng-dropdown-panel-items scroll-host"] > div:nth-child(2) > div',
        newPatientFormCityCombo: '[formcontrolname="city"]',
        newPatientSaveButton: '[class="btn btn-orange px-3"]'
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
            .setValueVisible(this.elements.newPatientFormFirstNameInput, 'Automaticu')
            .setValueVisible(this.elements.newPatientFormLastNameInput, 'Testeru')
            .setValueVisible(this.elements.newPatientFormDateOfBirthInput, '11111999')
            .setValueVisible(this.elements.newPatientFormKvnrInput, 'A987654321')
            .clickVisible(this.elements.newPatientFormCostBearerCombo)
            .setValueVisible(this.elements.newPatientFormCostBearerInput, 'KK eVo')
            .waitForElementVisible(this.elements.newPatientFormComboResult)
            .clickVisible(this.elements.newPatientFormComboResult)
            .pause(1000)
            .sendKeys(this.elements.newPatientFormCostBearerInput, [browser.Keys.TAB])
            .setValueVisible(this.elements.newPatientFormStreetInput, 'Eurotec-Ring')
            .setValueVisible(this.elements.newPatientFormHouseNrInput, '10')
            .clickVisible(this.elements.newPatientFormPostalCodeCombo)
            .setValueVisible(this.elements.newPatientFormPostalCodeInput, '47445')
            .pause(2000)
            .waitForElementVisible(this.elements.newPatientFormComboResult)
            .elements('css selector', this.elements.newPatientFormComboResult, (object) => {
                let i = 0;
                let items = object[Object.keys(object)[0]];
                let len = items.length;
                for (i = 0; i < len - 3; i++) {
                    browser.getText(items[i], async (result) => {
                        console.count('item: ')
                        console.log(result)
                        browser.sendKeys(this.elements.newPatientFormPostalCodeInput, [browser.Keys.ARROW_DOWN])
                            if (result.value === '47445 - Moers') {
                                browser.sendKeys(this.elements.newPatientFormPostalCodeInput, [browser.Keys.ENTER])
                            }
                            else return
                        })
                }
                browser.sendKeys(this.elements.newPatientFormPostalCodeInput, [browser.Keys.ENTER])
            })
            .pause(1000)
            .clickVisible(this.elements.newPatientSaveButton)
            .waitForElementVisible(this.elements.patientsOverviewPaginationSelectedRange)
    };
    async searchForPatient() {
        return browser
            .setValueVisible(this.elements.lowHeaderSearchFieldInput, 'Testeru')
            .clickVisible(this.elements.lowHeaderSearchButton)
            .expect.element(this.elements.patientsOverviewPaginationSelectedRange).text.toContain('1 - 1 von 1')
    };
    async deletePatient() {
        return browser
            .clickVisible(this.elements.patientsOverviewDeleteItemButton)
            .clickVisible(this.elements.patientsOverviewDeleteItemConfirmationButton)
            .waitForElementVisible(this.elements.patientsOverviewEmptyRowLabel)
    };
    async logoutUser() {
        return browser
            .clickVisible(this.elements.logoutButton)
    };
}