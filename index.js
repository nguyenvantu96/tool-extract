const testFolder = './';
var extract = require('extract-zip')
const fs = require('fs');
var listFile = [];
var listFolder = [];



function filter(){
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
              if(file.endsWith('.rar') || file.endsWith('.zip') ){
                  listFile.push(file)
              } else{
                  var stats = fs.statSync(testFolder+ file);
                  if(stats.isDirectory()){
                      listFolder.push(file)
                  }
              }
        });
      });
}
function ex(filename){
    
    extract(filename, {dir: __dirname}, function (err) {
        
    })
}

ex('New folder.rar');
