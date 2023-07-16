const config = require("config");
const winston = require("winston/lib/winston/config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    console.log(config.get("jwtPrivateKey"), '------------------------');
    console.error("Fatal error jwtPrivateKey is not defined");
    // new winston.transports.Console({colorize:true, prettyPrint:true})
    // throw new Error("Fatal error jwtPrivateKey is not defined"); // throw an error so our uncaughtException handler will catch it

    // process.exit(1);
  }
};
