export default class PrescriptionPdfExt {
    url = 'chrome-extension://mhjfbmdgcfjbbpaeojofohoefgiehjai/index.html';
    elements = {
        pdfViewerContainer: '[id="viewer"]'
    };
    async shadowElements() {
        return browser
            .pause(11000)
            .getShadowRoot(this.elements.pdfViewerContainer, async (result) => {
                console.log(result)
            })     
    }
}