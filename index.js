const express = require("express");
const logger = require("./logger");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();
require("./startup/config")()

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.log("listening on port: " + port);
});
