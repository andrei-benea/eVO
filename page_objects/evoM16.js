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
        searchResultBoxExtendedFirstNameInput: '[class="modal-content"] [placeholder="Vorname"]',
        searchResultBoxExtendedSubmitButton: '[class="modal-body container-fluid p-lg-5"] [type="submit"]',
        searchResultBoxRowEven: '[class="datatable-body-row datatable-row-even"]',
        searchResultBoxRowOdd: '[class="datatable-body-row datatable-row-odd"]',
        searchResultBoxRowEvenColumn: '[class="datatable-body-row datatable-row-even"] [class="datatable-body-cell sort-active"] > div > span',
        searchResultBoxRowEvenColumnBirthDate: '[class="datatable-body-row datatable-row-even"] [class="datatable-body-cell sort-active"] > div',
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
                    console.log('Identified patient:', '\n', text)
                    if (text.value === 'Wagner-Könnemann\nÉlodie Joséphine\n05.08.1953\nK458796231\n08056\nZwickau') {
                        browser.clickVisible(this.elements.searchResultBoxRowEven)
                    }
                    else console.log('Wrong search result!')
                })
            })
    };
}