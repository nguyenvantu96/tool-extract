
const fs = require('fs');
var searchTxt = 'vantu';
var replaceTxt = 'tubeo';
var linkFilegoc = './tool-extract/fileGoc/';
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
            if(searchTxt != '' || replaceTxt != ''){
                listRename.forEach(ele =>{
                    let temp = ele;
                   if( ele.search(searchTxt) >= 0){
                     let result =  temp.replace(searchTxt,replaceTxt);
                        exec(`mv -f ${temp} ${result}`)
                   }
                })
            }
        }
        // copy()  
    });
}
function zipFinal(){
    fs.readdir('./', (err, files) => {
        files.forEach(file => {
                var stats = fs.statSync('./' + file);
                if (stats.isDirectory()) {
                exec(`7z a ${file}.zip ./${file}`)
                } 
               
                
        });
    });
}

function copy(){
    fs.readdir('./', (err, files) => {
        files.forEach(file => {
                var stats = fs.statSync('./' + file);
                if (stats.isDirectory()) {
                    
                    fs.readdir(linkFilegoc, (err, files) => {
                        files.forEach(fileOn => {
                               exec(`mv -i ${linkFilegoc}${fileOn} ${file}`)
                        });
                    });

                } 
               
                
        });
        zipFinal() });
}

function main (){
    q++;
    filterRename('./');
   
   
}
main();
