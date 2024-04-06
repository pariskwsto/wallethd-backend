const express = require("express");

const {
  getAllSubcategories,
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require("../../controllers/subcategories");

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllSubcategories).post(createSubcategory);

router
  .route("/:id")
  .get(getSubcategory)
  .put(updateSubcategory)
  .delete(deleteSubcategory);

module.exports = router;
