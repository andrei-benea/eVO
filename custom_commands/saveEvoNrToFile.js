export default class SaveEvoNrToFile {
    async command() {
        const fs = require('fs');
        const { Console } = require("console");
        const myLogger = new Console({
            stdout: fs.createWriteStream("./tests_output/normalStdOut.txt"),
            stderr: fs.createWriteStream("./tests_output/errStdErr.txt")
        });
        try {
            browser
                .captureNetworkRequests((requestParams) => {
                    let regexSend = /(sen)\w+/g;
                    let regexM16 = /(m1)\w+/g;
                    let regexSp = /[A-Z a-z\+\:\,\-\.\'\/\=\&\x3]/g;
                    let str = requestParams.request.url.toString();
                    if (str.match(regexSend)) {
                        let strnew = str.replace(regexM16, '')
                        let stredited = strnew.replace(regexSp, '')
                        myLogger.log('eVO Nr: ' + stredited)
                        // myLogger.log('url: ' + requestParams.request.url)
                        // myLogger.log('method: ' + requestParams.request.method)
                    }
                    else return;
                })
        } catch (err) {
            console.error(err);
        }
    }
}