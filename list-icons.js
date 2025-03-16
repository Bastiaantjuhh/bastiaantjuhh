const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'assets/icons');

fs.readdir(directoryPath, (error, files) => {

    if (error) {
        return console.error('Error: ', error);
    }
    
    const webpFiles = files.filter(file => path.extname(file).toLowerCase() === '.webp');

    const imgString = webpFiles.map(file => {
        return `<img src="./assets/icons/${file}" width="32" height="32" style="max-width:100%;"> `;
    }).join('');
    
    console.log(imgString);
});