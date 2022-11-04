export default class LeLoginPage {
    url = 'https://check-le.zhp-online.de/x3/de/';
    elements = {

    };
    async checkRequest() {
        return browser
            .captureNetworkRequests((requestParams) => {
                console.log('url: ' + requestParams.request.url)
                console.log('method: ' + requestParams.request.method)
            })
    };
    async initPage() {
        return browser
            .maximizeWindow()
            .url(this.url)
            .assert.urlContains(this.url)
    };
}