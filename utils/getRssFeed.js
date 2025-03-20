/*
 * Copyright (c) Bastiaan de Hart
 * Licensed under MIT license
 * 
 */

const { request } = require("undici");
const { parseString } = require("xml2js");

const RSS_URL = "https://bdeha.art/";

async function fetchRSS() {
    
    try {
        const response = await request(RSS_URL);
        const data = await response.body.text();

        return new Promise((resolve, reject) => {

            parseString(data, (error, result) => {

                if (error) {

                    console.log("Error: " + error);
                    return reject(err);
                }

                try {

                    const items = result.rss.channel[0].item.slice(0, 5);
                    const formattedItems = items.map(item => {
                        const date = new Date(item.pubDate[0]);
                        const formattedDate = date.toLocaleString("nl-NL", { 
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit", 
                            hour: "2-digit",
                            minute: "2-digit" 
                        }).replace(",", "");

                        return `<li>${formattedDate} - <a href="${item.link[0]}">${item.title[0]}</a></li>\n`;
                    }).join("");

                    resolve(`<ul>${formattedItems}</ul>`);
                } catch (error) {

                    console.log("Error: " + error);
                    resolve("<ul><li>No blog posts.</li></ul>");
                }
            });
        });

    } catch (error) {

        console.log("Error: " + error);

        return "<ul><li>No blog posts.</li></ul>";
    }
}

module.exports = fetchRSS;