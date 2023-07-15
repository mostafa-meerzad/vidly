const {createLogger, format, transports} = require("winston");

const logger = createLogger({
  level: "debug",
  format: format.json(),
  transports: [new transports.File({filename:"./logFile.log"})],
});

module.exports = logger;

// const {createLogger, format, transports} = require("winston/lib/winston/config");

// const logger = createLogger(
//     {
//         level:"debug",
//         format:format.json(),
//         transports:[new transports.Console()],
//     }
// )
// module.exports = logger;