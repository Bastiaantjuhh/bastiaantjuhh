/*
 * Copyright (c) Bastiaan de Hart
 * Licensed under MIT license
 * 
 */

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

module.exports = getFormattedNow;