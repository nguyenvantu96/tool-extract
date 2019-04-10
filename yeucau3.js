

const fs = require('fs');
var listFile = [];
var listFolder = [];
var listlinhtin = [];


var deleteTxt = ['vantu','vantu2'];
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
        }
    });
}


function deleteFile(){
    listlinhtin.forEach(element=>{
        deleteTxt.forEach(ele =>{
			if(element.search(ele) >= 0 && deleteTxt != null){
            exec(`rm -rf ${element}`)
        }
		})
    })
}

function main (){
    q++;
    filter('./');
   
}
main();
