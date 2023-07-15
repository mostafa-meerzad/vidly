const logger = require("../logger")
module.exports =  function (err, req, res, next) {
    // this function is called error middleware
    res.status(500).send("something failed")
    logger.error("something went wrong")
}