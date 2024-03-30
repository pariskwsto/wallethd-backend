// enviroment variables
require("dotenv").config();

// third party libs
require("colors");
const express = require("express");
const morgan = require("morgan");

// server configuration
const config = require("./config");
const port = config.port;

// db connection
const connectDB = require("./config/db");
connectDB();

// express application
const app = express();

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const server = app.listen(port, () => {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`.cyan);
  console.log(`App listening on port: ${port}`.cyan);
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Database Error: ${err.message}`.red.underline);
  // close server and exit process
  server.close(() => process.exit(1));
});
