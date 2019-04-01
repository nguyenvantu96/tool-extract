const fs = require('fs');
const { exec } = require('child_process');

var listFile = [];
var listFolder = [];
var q = 0;
function filter(testFolder) {
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            if (file.endsWith('.rar') || file.endsWith('.zip')) {
                listFile.push(testFolder+file)
            } else {
                var stats = fs.statSync(testFolder + file);
                if (stats.isDirectory()) {
                    q++;
                    // console.log(testFolder, file, stats);
                    filter(testFolder + file + '/');
                }
            }
        });
        q--;
        if(q==0) console.log(listFile);
    });
}
function main (){
    q++;
    filter('./');
}
main();
