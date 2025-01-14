require("dotenv").config();

function debug(message) {
    if (process.env.DEBUG === "true") {
        console.debug('DEBUG: \n', message , '\n');
    }
}

module.exports = debug;