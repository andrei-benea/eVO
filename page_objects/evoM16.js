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
        lowHeaderSearchButton: '[class="btn btn-link text-white"]',
        patientsAddNewButton: '[class="d-flex align-items-center bg-blue"] [class="px-4"]:nth-child(2)',
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
            .setValueVisible(this.elements.newPatientFormFirstNameInput, 'Auto')
            .setValueVisible(this.elements.newPatientFormLastNameInput, 'Tester')
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
            .sendKeys(this.elements.newPatientFormPostalCodeInput, [browser.Keys.ENTER])
            // .elements('css selector', this.elements.newPatientFormComboResult, (object) => {
            //     let i = 0;
            //     let items = object[Object.keys(object)[0]];
            //     let len = items.length;
            //     for (i = 0; i < len; i++) {
            //         browser.getText(items[i], async (result) => {
            //             console.count('item: ')
            //             console.log(result)
            //                 if (result.value === '47445 - Moers') {
            //                     for(let j = 0; j <= len; j++) {
            //                             browser.sendKeys(this.elements.newPatientFormComboResult, [browser.Keys.ARROW_DOWN])
            //                     }
            //                     browser
            //                         .sendKeys(this.elements.newPatientFormComboResult, [browser.Keys.ENTER])
            //                         .pause(1000)
            //                 }
            //                 else return
            //             })
            //     }
            // })
            .pause(3000)
    }
    async logoutUser() {
        return browser
            .clickVisible(this.elements.logoutButton)
    }
}