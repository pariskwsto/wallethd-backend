const express = require("express");

const auth = require("./auth");
const categories = require("./categories");
const media = require("./media");
const subcategories = require("./subcategories");
const transactions = require("./transactions");

const router = express.Router();

router.use("/auth", auth);
router.use("/categories", categories);
router.use("/media", media);
router.use("/subcategories", subcategories);
router.use("/transactions", transactions);

module.exports = router;
