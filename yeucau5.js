const fs = require('fs');

var listFolder = [];
var fileFrom ='./files/*';
const { exec } = require('child_process');


function filter(testFolder) {
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            var stats = fs.statSync(testFolder + file);
            if (stats.isDirectory() && file != '.git' ) {
                if((testFolder+file) != fileFrom ){
                    listFolder.push(testFolder+file)
                }
       }
        })
        ex();
    })
}


function ex() {
    listFolder.forEach(filename =>{
        exec(`cp ${fileFrom} ${filename}`)
    })
}
function main (){
    filter('./');
   
}
main();
