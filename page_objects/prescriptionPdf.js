export default class PrescriptionPdf {
    url = '';
    elements = {
        pdfViewerContainer: '[id="viewer"]'
    };
    async switchToPdf() {
        return browser
            .switchTab(1);
    };
    async switchToClient() {
        return browser
            .switchTab(0);
    };
    async verifyPdfPrescription() {
        return browser
            .waitForElementVisible(this.elements.pdfViewerContainer)
    };
    async checkFileExists() {
        
    };
}