const logger = require("../logger");

module.exports = function () {
  process.on("uncaughtException", (err) => {
    // console.log("error occurred \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
    // console.log(err);
    logger.info(err.message);
  });

  process.on("unhandledRejection", (err) => {
    logger(err.message);
  });

  // throw new Error("unhandledRejection");
  // throw new Error("something went wrong during startup");

};
