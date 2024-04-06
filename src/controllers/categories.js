const asyncHandler = require("../middleware/asyncHandler");
const Category = require("../models/Category");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc    Get all categories
 * @route   GET /v1/categories
 * @access  Private
 */
exports.getAllCategories = asyncHandler(async (_, res) => {
  const categories = await Category.find().populate("subcategories");
  res.status(200).json({ success: true, data: categories });
});

/**
 * @desc    Get single category
 * @route   GET /v1/categories/:id
 * @access  Private
 */
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: category });
});

/**
 * @desc    Create new category
 * @route   POST /v1/categories
 * @access  Private
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, data: category });
});

/**
 * @desc    Update category
 * @route   PUT /v1/categories/:id
 * @access  Private
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(
      new ErrorResponse(`Category with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: category });
});

/**
 * @desc    Delete category
 * @route   DELETE /v1/categories/:id
 * @access  Private
 */
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category with id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
