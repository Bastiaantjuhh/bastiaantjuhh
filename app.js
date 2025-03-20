/*
 * Copyright (c) Bastiaan de Hart
 * Licensed under MIT license
 * 
 */

const fs = require("fs");

const getRandomLineFromJSON = require("./utils/getRandomLine");
const getToolsImages = require("./utils/getToolsImages");
// const fetchRSS = require("./utils/getRssFeed");
const getLinks = require("./utils/getLinks");
const getFormattedNow = require("./utils/getFormattedNow");

// Replace placeholders
async function updateReadme() {

    try {

        const data = fs.readFileSync("./README.template", { encoding: "utf-8" });

        const [toolsImages, rssFeed] = await Promise.all([
            getToolsImages(),
            // fetchRSS()
        ]);

        const updatedData = data
            .replace("<!--RANDOM_LINE-->", getRandomLineFromJSON())
            // .replace("<!--BLOG_POSTS-->", rssFeed)
            .replace("<!--TOOLS_IMAGES-->", toolsImages)
            .replace("<!--NOW-->", getFormattedNow()) 
            .replace("<!--HYPERLINKS-->", getLinks()); 

        fs.writeFileSync("./README.md", updatedData, { encoding: "utf-8" });

        console.log(" ");
        console.log("=====================================");
        console.log("✅ README.md updated with latest data");
        console.log("=====================================");
        console.log(" ");

    } catch (error) {

        console.log("❌ Error with building the README: " + error);
    }
}

updateReadme();