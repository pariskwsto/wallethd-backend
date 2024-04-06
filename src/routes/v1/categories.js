const express = require("express");

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/categories");

// include other resource routers
const subcategoryRouter = require("./subcategories");

const router = express.Router();

// re-route into other resource routers
router.use("/:categoryId/subcategories", subcategoryRouter);

router.route("/").get(getAllCategories).post(createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
