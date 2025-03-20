/*
 * Copyright (c) Bastiaan de Hart
 * Licensed under MIT license
 * 
 */

const fs = require("fs").promises;
const path = require("path");

async function getToolsImages() {
    
    try {

        const directoryPath = path.join(__dirname, "../assets/icons");
        const files = await fs.readdir(directoryPath);
        const webpFiles = files.filter(file => path.extname(file).toLowerCase() === ".webp");

        return `<p align="center"> ${webpFiles.map(file => 
            `<img src="./assets/icons/${file}" width="32" height="32" style="max-width:100%;"> `
        ).join("")}</p>`;

    } catch (error) {

        console.log("Error: " + error);

        return '<p align="center">None</p>';
    }
}

module.exports = getToolsImages;