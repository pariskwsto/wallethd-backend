// enviroment variables
require("dotenv").config();

// built-in libs
const fs = require("fs");

// third party libs
require("colors");
const mongoose = require("mongoose");

// load models
const Category = require("../src/models/Category");
const Subcategory = require("../src/models/Subcategory");

// connect to DB
mongoose.connect(process.env.MONGO_URI);

// read JSON files
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/categories.json`, "utf-8")
);

const subcategories = JSON.parse(
  fs.readFileSync(`${__dirname}/subcategories.json`, "utf-8")
);

// import into DB
const importData = async () => {
  try {
    await Category.create(categories);
    await Subcategory.create(subcategories);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// delete data
const deleteData = async () => {
  try {
    await Category.deleteMany();
    await Subcategory.deleteMany();

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
} else {
  process.exit();
}
