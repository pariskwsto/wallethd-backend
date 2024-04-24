const express = require("express");

const {
  getAllSubcategories,
  getSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require("../../controllers/subcategories");

const { advancedResults } = require("../../middleware/advancedResults");
const { authenticate, authorize } = require("../../middleware/auth");

const Subcategory = require("../../models/Subcategory");

const router = express.Router({ mergeParams: true });

router.use(authenticate);

router
  .route("/")
  .get(
    advancedResults(Subcategory, {
      path: "category",
      select: "name",
    }),
    getAllSubcategories
  )
  .post(authorize("admin"), createSubcategory);

router
  .route("/:id")
  .get(getSubcategory)
  .put(authorize("admin"), updateSubcategory)
  .delete(authorize("admin"), deleteSubcategory);

module.exports = router;
