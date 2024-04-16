const express = require("express");

const auth = require("./auth");
const categories = require("./categories");
const media = require("./media");
const subcategories = require("./subcategories");

const router = express.Router();

router.use("/auth", auth);
router.use("/categories", categories);
router.use("/media", media);
router.use("/subcategories", subcategories);

module.exports = router;
