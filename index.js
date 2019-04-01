const testFolder = './';
const fs = require('fs');
var listFile = [];
var listFolder = [];
const { exec } = require('child_process');

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
            ex()
    });
}
function ex() {
  listFile.forEach(filename => {
    if (filename.endsWith('.zip')) {
      exec(`7z e ${filename}
      rm -rf ${filename}
      `)
    } 
    if (filename.endsWith('.rar')) {
      exec(`unrar e ${filename}
      rm -rf ${filename}
      `)
    }
  });
 
}
function main (){
    filter();

}
main();
