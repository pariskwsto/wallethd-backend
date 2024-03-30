// enviroment variables
require("dotenv").config();

// third party libs
require("colors");
const express = require("express");
const morgan = require("morgan");

// server configuration
const config = require("./config");
const port = config.port;

// express application
const app = express();

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(port, () => {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`.cyan);
  console.log(`App listening on port: ${port}`.cyan);
});
