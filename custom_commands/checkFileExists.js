export default class CheckFileExists {
    async command(path) {
        const fs = require('fs');
        if (fs.existsSync(path)) {
            console.log('The file Exists')
        }
        else {
            throw new Error('The File Doesn\'t exist')
        }
    }
}