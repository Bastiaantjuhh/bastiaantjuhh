/*
 * Copyright (c) Bastiaan de Hart
 * Licensed under MIT license
 * 
 */

const fs = require("fs");

function getLinks() {
    
    try {

        const data = fs.readFileSync("./data/links.json", "utf8");
        const linksArray = JSON.parse(data);

        if (!Array.isArray(linksArray) || linksArray.length === 0) {
            return '<p align="center">No hyperlinks</p>';
        }

        const formattedLinks = linksArray.map(link => 
            `<a href="${link.url}">${link.name}</a>`
        ).join(" • ");

        return `<p align="center">${formattedLinks}</p>`;

    } catch (error) {

        console.log("Error with links.json: " + error);
        return '<p align="center">No Hyperlinks</p>';
    }
}

module.exports = getLinks;