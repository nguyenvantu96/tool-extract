
const fs = require('fs');
var listFile = [];
var listFolder = [];
var listlinhtin = [];
var listRename=[];

var deleteTxt = '';
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
                if(stats.isFile()){
                    listlinhtin.push(testFolder+ file)
                }
            }
        });
        q--;
        if(q==0) {
         deleteFile();
        ex();
        }
    });
}
function deleteFile(){
    listlinhtin.forEach(element=>{
        if(element.search(deleteTxt) >= 0 && deleteTxt != ''){
            exec(`rm -rf ${element}`)
        }
    })
}
function ex() {
  listFile.forEach(filename => {
    const path = filename.substr(0, filename.lastIndexOf('/') + 1);
    if (filename.endsWith('.zip')) {
      
      exec(`7z e '${filename}' -o${path} && rm -rf '${filename}'`)
    } 
    if (filename.endsWith('.rar')) {
             exec(`unrar e '${filename}' ${path} && rm -rf '${filename}'`)
    }

  });
 
}
function main (){
    q++;
    filter('./');
   
}
main();
