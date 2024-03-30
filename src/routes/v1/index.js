const express = require("express");

const categories = require("./categories");

const router = express.Router();

router.use("/categories", categories);

module.exports = router;
