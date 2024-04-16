// enviroment variables
require("dotenv").config();

// built-in libs
const fs = require("fs");

// third party libs
require("colors");
const mongoose = require("mongoose");

// load models
const Category = require("../src/models/Category");
const Media = require("../src/models/Media");
const Subcategory = require("../src/models/Subcategory");
const User = require("../src/models/User");

// connect to DB
mongoose.connect(process.env.MONGO_URI);

// read JSON files
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/categories.json`, "utf-8")
);

const media = JSON.parse(fs.readFileSync(`${__dirname}/media.json`, "utf-8"));

const subcategories = JSON.parse(
  fs.readFileSync(`${__dirname}/subcategories.json`, "utf-8")
);

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

// import into DB
const importData = async () => {
  try {
    await Category.create(categories);
    await Media.create(media);
    await Subcategory.create(subcategories);
    await User.create(users);

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
    await Media.deleteMany();
    await Subcategory.deleteMany();
    await User.deleteMany();

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
