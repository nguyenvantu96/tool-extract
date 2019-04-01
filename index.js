
const fs = require('fs');
var listFile = [];
var listFolder = [];
const { exec } = require('child_process');
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
                   
                    filter(testFolder + file + '/');
                }
            }
        });
        q--;
        if(q==0) {
        ex();
             console.log(listFile);
        }
    });
}
function ex() {
  listFile.forEach(filename => {
    if (filename.endsWith('.zip')) {
      exec(`7z e '${filename}' && rm -rf '${filename}'`)
    } 
    if (filename.endsWith('.rar')) {
      exec(`unrar e '${filename}' && rm -rf '${filename}'`)
    }
  });
 
}
function main (){
    q++;
    filter('./');

}
main();
