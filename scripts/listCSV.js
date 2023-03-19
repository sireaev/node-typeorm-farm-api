const testFolder = '../files/';
const fs = require('fs');

const listCSV = () => {
    const files = [];
    fs.readdirSync(testFolder).forEach(file => {
        if (/\.csv$/.test(file)) {
            files.push(file);
        }
    });

    return files;
}

console.log(listCSV());
