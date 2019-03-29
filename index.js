const testFolder = './';
var extract = require('extract-zip')
const fs = require('fs');
var listFile = [];
var listFolder = [];
const { exec } = require('child_process');

function deleteFile(keyword, path,name) {
  
    if (name.search(keyword) >= 0) {
        fs.unlinkSync(path + '\\' + name);
    }
}

function filter() {
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            if (file.endsWith('.rar') || file.endsWith('.zip')) {
                listFile.push(file)
            } else {
                var stats = fs.statSync(testFolder + file);
                if (stats.isDirectory()) {
                    listFolder.push(file)
                }
            }
        });
    });
}

function ex(filename) {
    if (filename.endsWith('.zip')) {
        extract(filename, {
            dir: __dirname
        }, function (err) {})
    }
}
// exec(`cd ${__dirname}
// mkdir acc`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//   });
exec('7z e "New folder.zip"')
