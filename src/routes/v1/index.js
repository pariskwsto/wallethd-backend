const express = require("express");

const categories = require("./categories");
const subcategories = require("./subcategories");

const router = express.Router();

router.use("/categories", categories);
router.use("/subcategories", subcategories);

module.exports = router;
