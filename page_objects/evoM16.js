export default class EvoM16 {
    url = 'https://check-evo-m16.x3.net/regulation/m16';
    elements = {
        navPatientsButton: '[class="d-flex align-items-center px-3 menu-item"]:nth-child(6)',
        navDoctorsButton: '[class="d-flex align-items-center px-3 menu-item"]:nth-child(7)',
        navActiveButton: '[class="d-flex align-items-center px-3 menu-item active-item"]',
        navInactiveButton: '[class="d-flex align-items-center px-3 menu-item"]',
        lowHeaderSearchField: '[formcontrolname="term"]',
        lowHeaderSearchFieldInput: '[formcontrolname="term"] > div > div > div > div > input',
        lowHeaderSearchButton: '[class="btn btn-link text-white"]',
        lastNameInput: '[placeholder="Name"]',
        hmvSetsButton: '[class="btn btn-sm btn-light-blue"]',
        hmvSetsRowFour: '[class="datatable-row-wrapper"]:nth-child(4)',
        diagnosisInput: '[placeholder="weitere Diagnosen"]',
        firstSupplyCheckbox: '[class="second-column d-flex w-100"] [class="d-flex flex-column align-items-center mr-4 mb-2"]:nth-child(6) > div',
        additionalInfoInsurantDetailsComboInput: '[class="modal-content"] [role="combobox"] > input',
        acceptSendingDataSwitch: '[formcontrolname="dataAccepted"]',
        acceptRecommendedLeSwitch: '[formcontrolname="recommendedAccepted"]',
        sendOptionsCombo: '[formcontrolname="prescriptionOption"] [role="combobox"]',
        sendOptionsResultsRowOne: '[class="ng-dropdown-panel-items scroll-host"] > div:nth-child(2) > div:nth-child(1)',
        sendEvoButton: '[class="btn btn-red btn-lg btn-block"]',
        searchResultBox: '[class="modal-content"]',
        searchResultBoxOkButton: '[class="btn btn-orange ml-2 px-5 py-2"]',
        searchResultBoxConfirmButton: '[class="btn btn-orange px-5 py-2 m-2"]',
        searchResultBoxExtendedFirstNameInput: '[class="modal-content"] [placeholder="Vorname"]',
        searchResultBoxExtendedSubmitButton: '[class="modal-body container-fluid p-lg-5"] [type="submit"]',
        searchResultBoxRowEven: '[class="datatable-body-row datatable-row-even"]',
        searchResultBoxRowOdd: '[class="datatable-body-row datatable-row-odd"]',
        searchResultRowOne: '[class="datatable-scroll"] [class="datatable-row-wrapper"]:nth-child(1)',
        searchResultBoxRowEvenColumn: '[class="datatable-body-row datatable-row-even"] [class="datatable-body-cell sort-active"] > div > span',
        searchResultBoxRowEvenColumnBirthDate: '[class="datatable-body-row datatable-row-even"] [class="datatable-body-cell sort-active"] > div',
        decisionText: '[class="modal-body p-5"] > div:nth-child(1)',
        decisionCloseButton: '[class="btn btn-blue px-5 py-2 mr-3"]',
    };
    async searchForPatientM16() {
        return browser
            .setValueVisible(this.elements.lowHeaderSearchFieldInput, 'Wagner')
            .clickVisible(this.elements.lowHeaderSearchButton)
            .setValueVisible(this.elements.searchResultBoxExtendedFirstNameInput, 'Élodie Joséphine')
            .clickVisible(this.elements.searchResultBoxExtendedSubmitButton)
            .pause(500)
            .waitForElementVisible(this.elements.searchResultBoxRowEven)
            .element('css selector', this.elements.searchResultBoxRowEven, async (object) => {
                let item = object[Object.keys(object)[0]];
                browser.getText(item, async (text) => {
                    console.log('Identified patient:', '\n', text.value)
                    if (text.value === 'Wagner-Könnemann\nÉlodie Joséphine\n05.08.1953\nK458796231\n08056\nZwickau') {
                        browser.clickVisible(this.elements.searchResultBoxRowEven)
                    }
                    else console.log('Wrong search result!')
                })
            })
    };
    async selectHmvSet() {
        return browser
            .clickVisible(this.elements.hmvSetsButton)
            .waitForElementVisible(this.elements.searchResultBox)
            .clickVisible(this.elements.hmvSetsRowFour)
            .pause(1000)
    };
    async searchSelectDiagnosis() {
        return browser
            .setValueVisible(this.elements.diagnosisInput, 'E10')
            .clickVisible(this.elements.searchResultRowOne)
            .pause(1000)
    };
    async selectVoType() {
        return browser
            .clickVisible(this.elements.firstSupplyCheckbox)
            .waitForElementVisible(this.elements.searchResultBox)
    };
    async definePrescriptionAdditions() {
        return browser
            .setValueVisible(this.elements.additionalInfoInsurantDetailsComboInput, 'ICT')
            .sendKeys(this.elements.additionalInfoInsurantDetailsComboInput, [browser.Keys.ENTER])
    };
    async chooseSendOption() {
        return browser
            .clickVisible(this.elements.acceptSendingDataSwitch)
            .clickVisible(this.elements.acceptRecommendedLeSwitch)
            .clickVisible(this.elements.sendOptionsCombo)
            .clickVisible(this.elements.sendOptionsResultsRowOne)
            .clickVisible(this.elements.sendEvoButton)
    };
    async chooseLe() {
        return browser
            .waitForElementVisible(this.elements.searchResultBox)
            .clickVisible(this.elements.searchResultRowOne)
            .clickVisible(this.elements.searchResultBoxOkButton)
            .clickVisible(this.elements.searchResultRowOne)
            .clickVisible(this.elements.searchResultBoxOkButton)
            .clickVisible(this.elements.searchResultBoxConfirmButton)
    };
    async verifyDecision() {
        return browser
            .waitForElementVisible(this.elements.searchResultBox)
            .getText(this.elements.decisionText, async (text) => {
                console.log(text)
                if (text.value === 'Im Namen der BARMER bedanken wir uns bei Ihnen.\n' +
                'Die Verordnung wurde an Abbott GmbH weitergeleitet, wo die nächsten Schritte automatisch eingeleitet werden.\n' +
                'Bitte senden Sie die Verordnung in Papierform an\n' +
                'HMM Deutschland GmbH,\n' +
                'Eurotec-Ring 10, 47445 Moers.') {
                    browser.clickVisible(this.elements.decisionCloseButton)
                }
                else console.log('Wrong decision!')
            })
    }
}