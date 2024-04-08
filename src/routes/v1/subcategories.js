const express = require("express");

const {
  getAllSubcategories,
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require("../../controllers/subcategories");

const advancedResults = require("../../middleware/advancedResults");

const Subcategory = require("../../models/Subcategory");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(Subcategory, {
      path: "category",
      select: "name",
    }),
    getAllSubcategories
  )
  .post(createSubcategory);

router
  .route("/:id")
  .get(getSubcategory)
  .put(updateSubcategory)
  .delete(deleteSubcategory);

module.exports = router;
