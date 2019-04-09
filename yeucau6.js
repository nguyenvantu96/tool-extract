const fs = require('fs');
var listFolder = [];

const {
    exec
} = require('child_process');

function filter(testFolder) {
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            var stats = fs.statSync(testFolder + file);
            if (stats.isDirectory() && file != '.git') {
                listFolder.push(file);
            }
        })
        ex(testFolder);
    })
}

function ex(testFolder) {
    listFolder.forEach(filename => {
            exec(`zip -r '${filename}.zip' ${testFolder}`)
            console.log(`zip -r '${filename}.zip' ${testFolder}`);
    });
}
function main() {

    filter('./');

}
main();
