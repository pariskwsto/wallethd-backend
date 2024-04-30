// enviroment variables
require("dotenv").config();

// third party libs
require("colors");
const express = require("express");
const fileupload = require("express-fileupload");
const morgan = require("morgan");

// server configuration
const { port, publicUploadsBasePath } = require("./config/express");

// db connection
const { connectDB } = require("./config/db");
connectDB();

// middleware
const errorHandler = require("./middleware/errorHandler");

// express application
const app = express();

// body parser
app.use(express.json());
// file uploading
app.use(fileupload());

// set static folder
app.use(express.static(publicUploadsBasePath));

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mount routers
app.use("/v1", require("./routes/v1"));

app.use(errorHandler);

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
