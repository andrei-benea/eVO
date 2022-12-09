export default class PrescriptionPdf {
    url = '';
    elements = {};
    async switchToPdf() {
        return browser
            .switchTab(1);
    };
    async switchToClient() {
        return browser
            .switchTab(0);
    };
    async getUrl() {
        return browser
            .getCurrentUrl(async (url) => {
                console.log(url)
            });
    };
    async fuckingShit() {
        return browser
            .get()
    }
    async verifyDownload() {
        return browser
            .checkFileExists()
    };
}