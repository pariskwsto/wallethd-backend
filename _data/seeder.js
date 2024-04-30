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
const Transaction = require("../src/models/Transaction");
const User = require("../src/models/User");

// connect to DB
mongoose.connect(process.env.MONGO_URI);

// read JSON files
/** categories */
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/categories.json`, "utf-8")
);

/** media */
const media = JSON.parse(fs.readFileSync(`${__dirname}/media.json`, "utf-8"));

/** subcategories */
const subcategories = JSON.parse(
  fs.readFileSync(`${__dirname}/subcategories.json`, "utf-8")
);

/** transactions */
const transactionsJanedoe = JSON.parse(
  fs.readFileSync(`${__dirname}/transactionsJanedoe.json`, "utf-8")
);
const transactionsJanedoeSalaries = JSON.parse(
  fs.readFileSync(`${__dirname}/transactionsJanedoeSalaries.json`, "utf-8")
);
const transactionsJohnsmith = JSON.parse(
  fs.readFileSync(`${__dirname}/transactionsJohnsmith.json`, "utf-8")
);
const transactionsJohnsmithMealVouchers = JSON.parse(
  fs.readFileSync(
    `${__dirname}/transactionsJohnsmithMealVouchers.json`,
    "utf-8"
  )
);
const transactionsJohnsmithRent = JSON.parse(
  fs.readFileSync(`${__dirname}/transactionsJohnsmithRent.json`, "utf-8")
);
const transactionsJohnsmithSalaries = JSON.parse(
  fs.readFileSync(`${__dirname}/transactionsJohnsmithSalaries.json`, "utf-8")
);

/** users */
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

// import into DB
const importData = async () => {
  try {
    await Category.create(categories);
    await Media.create(media);
    await Subcategory.create(subcategories);
    await Transaction.create([
      ...transactionsJanedoe,
      ...transactionsJanedoeSalaries,
      ...transactionsJohnsmith,
      ...transactionsJohnsmithMealVouchers,
      ...transactionsJohnsmithRent,
      ...transactionsJohnsmithSalaries,
    ]);
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
    await Transaction.deleteMany();
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
