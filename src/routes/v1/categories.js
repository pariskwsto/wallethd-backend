const express = require("express");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/categories");

const advancedResults = require("../../middleware/advancedResults");

const Category = require("../../models/Category");

// include other resource routers
const subcategoryRouter = require("./subcategories");

const router = express.Router();

// re-route into other resource routers
router.use("/:categoryId/subcategories", subcategoryRouter);

router
  .route("/")
  .get(advancedResults(Category, "subcategories"), getAllCategories)
  .post(createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
