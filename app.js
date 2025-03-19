const fs = require("fs");
const { request } = require("undici");
const path = require("path");
const { parseString } = require("xml2js");

const RSS_URL = "https://bdeh.art/feed/rss.xml";

function getFormattedNow() {
    const now = new Date();
    
    // Date in dd-mm-yyyy
    const date = now.toLocaleDateString("nl-NL", {
        day: "2-digit", month: "2-digit", year: "numeric"
    });

    // Time in hh:mm:ss
    const time = now.toLocaleTimeString("nl-NL", {
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    });

    // Timezone
    const timeZone = Intl.DateTimeFormat("nl-NL", { timeZoneName: "short" })
        .formatToParts(now)
        .find(part => part.type === "timeZoneName").value;

    console.log("Now: " + date + " " + time + " " + timeZone);

    return `${date} ${time} ${timeZone}`;
}

// Get links from JSON
function getLinks() {

    try {

        const data = fs.readFileSync("./links.json", "utf8");
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

// Random line from JSON
function getRandomLineFromJSON() {
    try {

        const today = new Date();
        const day = today.getDate();
        // Month count starts with zero
        const month = today.getMonth() + 1;

        if (month === 12 && (day === 24 || day === 25 || day === 26)) {

            return "🎅🎄🦌 Ho ho ho Merry Christmas";

        } else if ((month === 12 && day === 31) || (month === 1 && day === 1)) {

            return "✨🎉 HAPPY NEW YEAR. 🎉✨";

        } else {

            console.log("No special day, So random quote it is...");

            // Random line from JSON
            const data = fs.readFileSync("./data.json", "utf8");
            const jsonArray = JSON.parse(data);
    
            const randomIndex = Math.floor(Math.random() * jsonArray.length);

            return jsonArray[randomIndex];
        } 

    } catch (error) {

        console.log("Error: " + error);
    }
}

// Get tools images
async function getToolsImages() {
    try {

        const directoryPath = path.join(__dirname, "assets/icons");
        const files = await fs.promises.readdir(directoryPath);

        // Only WebP wanted
        const webpFiles = files.filter(file => path.extname(file).toLowerCase() === ".webp");

        return `<p align="center"> ${webpFiles.map(file => 
            `<img src="./assets/icons/${file}" width="32" height="32" style="max-width:100%;"> `
        ).join("")}</p>`;

    } catch (error) {

        console.log("Error: " + error);

        return '<p align="center">None</p>';
    }
}

// Fetch RSS feed
/*
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
*/

// Replace placeholders inside README.template
async function updateReadme() {

    try {

        const data = fs.readFileSync("./README.template", { encoding: "utf-8" });

        const [toolsImages, latestActivity] = await Promise.all([
            getToolsImages(),
            // fetchRSS()
        ]);

        const updatedData = data
            .replace("<!--HYPERLINKS-->", getLinks())
            .replace("<!--RANDOM_LINE-->", getRandomLineFromJSON())
            //.replace("<!--RECENT_BLOG_POSTS-->", latestActivity)
            .replace("<!--TOOLS_IMAGES-->", toolsImages)
            .replace("<!--NOW-->", getFormattedNow());

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

// Roep de functie correct aan
updateReadme();