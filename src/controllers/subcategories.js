const asyncHandler = require("../middleware/asyncHandler");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc    Get all subcategories or by category
 * @route   GET /v1/categories/:categoryId/subcategories
 * @route   GET /v1/subcategories
 * @access  Private
 */
exports.getAllSubcategories = asyncHandler(async (req, res) => {
  if (req.params.categoryId) {
    const subcategories = await Subcategory.find({
      category: req.params.categoryId,
    });

    res.status(200).json({
      success: true,
      count: subcategories.length,
      data: subcategories,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

/**
 * @desc    Get single subcategory
 * @route   GET /v1/subcategories/:id
 * @access  Private
 */
exports.getSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = await Subcategory.findById(req.params.id).populate({
    path: "category",
    select: "name",
  });

  if (!subcategory) {
    return next(
      new ErrorResponse(`Subcategory with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: subcategory });
});

/**
 * @desc    Create new subcategory
 * @route   POST /v1/categories/:categoryId/subcategories
 * @access  Private
 */
exports.createSubcategory = asyncHandler(async (req, res, next) => {
  req.body.category = req.params.categoryId;

  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(
      new ErrorResponse(
        `Category with id ${req.params.categoryId} not found`,
        404
      )
    );
  }

  try {
    const subcategory = await Subcategory.create(req.body);
    res.status(201).json({ success: true, data: subcategory });
  } catch (err) {
    if (err.code === 11000) {
      return next(
        new ErrorResponse(
          `Subcategory "${req.body.name}" already exists in "${category.name}" category.`,
          400
        )
      );
    }

    return next(err);
  }
});

/**
 * @desc    Update subcategory
 * @route   PUT /v1/subcategories/:id
 * @access  Private
 */
exports.updateSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = await Subcategory.findById(req.params.id).populate({
    path: "category",
    select: "name",
  });

  if (!subcategory) {
    return next(
      new ErrorResponse(`Subcategory with id ${req.params.id} not found`, 404)
    );
  }

  try {
    const subcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ success: true, data: subcategory });
  } catch (err) {
    if (err.code === 11000) {
      return next(
        new ErrorResponse(
          `Subcategory "${req.body.name}" already exists in "${subcategory.category.name}" category.`,
          400
        )
      );
    }

    return next(err);
  }
});

/**
 * @desc    Delete subcategory
 * @route   DELETE /v1/subcategories/:id
 * @access  Private
 */
exports.deleteSubcategory = asyncHandler(async (req, res, next) => {
  const subcategory = await Subcategory.findByIdAndDelete(req.params.id);

  if (!subcategory) {
    return next(
      new ErrorResponse(`Subcategory with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
