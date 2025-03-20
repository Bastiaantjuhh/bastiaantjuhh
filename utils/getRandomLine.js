/*
 * Copyright (c) Bastiaan de Hart
 * Licensed under MIT license
 * 
 */

const fs = require("fs");

function getRandomLineFromJSON() {

    try {

        const today = new Date();
        const day = today.getDate();
        // Month count starts with zero
        const month = today.getMonth() + 1;

        // Loading special days
        const specialDaysData = fs.readFileSync("./data/special_days.json", "utf8");
        const specialDays = JSON.parse(specialDaysData);

        // Looking for special day match
        const specialDay = specialDays.find(d => d.day === day && d.month === month);

        if (specialDay) {
            return specialDay.message;
        }

        console.log("No special day, so picking a random quote...");

        // Random line from JSON
        const data = fs.readFileSync("./data/data.json", "utf8");
        const jsonArray = JSON.parse(data);
        const randomIndex = Math.floor(Math.random() * jsonArray.length);

        return jsonArray[randomIndex];

    } catch (error) {

        console.log("Error: " + error);
        return null;
    }
}

module.exports = getRandomLineFromJSON;