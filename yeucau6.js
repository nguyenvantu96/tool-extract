
const fs = require('fs');
var searchTxt = ['vantu2','vantu1'];
var replaceTxt = 'tubeo';

var listRename=[];
var listFolder =[];

const { exec } = require('child_process');
var q = 0;
function filterRename(testFolder) {
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
                var stats = fs.statSync(testFolder + file);
                if (stats.isDirectory()) {
                    q++;
                    filterRename(testFolder + file + '/');
                } 
                if(stats.isFile() && (!file.endsWith('.rar') || !file.endsWith('.zip'))){
                    listRename.push(testFolder+ file)
                }
        });
        q--;
        if(q==0) {
            if(searchTxt != null || replaceTxt != ''){
                listRename.forEach(ele =>{
                    searchTxt.forEach(elem =>{
                        let temp = ele;
                        if( ele.search(elem) >= 0){
                          let result =  temp.replace(elem,replaceTxt);
                             exec(`mv -f ${temp} ${result}`)
                        }
                    })
                })
            }
        }
    });
}
function main (){
    q++;
    filterRename('./');
   
   
}
main();
