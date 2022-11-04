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
                    myLogger.log('url: ' + requestParams.request.url)
                    myLogger.log('method: ' + requestParams.request.method)
                })
        } catch (err) {
            console.error(err);
        }
    }
}