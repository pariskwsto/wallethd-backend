const express = require("express");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/categories");

const advancedResults = require("../../middleware/advancedResults");
const { authenticate, authorize } = require("../../middleware/auth");

const Category = require("../../models/Category");

// include other resource routers
const subcategoryRouter = require("./subcategories");

const router = express.Router();

router.use(authenticate);

// re-route into other resource routers
router.use("/:categoryId/subcategories", subcategoryRouter);

router
  .route("/")
  .get(advancedResults(Category, "subcategories"), getAllCategories)
  .post(authorize("admin"), createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(authorize("admin"), updateCategory)
  .delete(authorize("admin"), deleteCategory);

module.exports = router;
