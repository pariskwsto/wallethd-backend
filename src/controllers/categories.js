const asyncHandler = require("../middleware/asyncHandler");
const Category = require("../models/Category");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc    Get all categories
 * @route   GET /v1/categories
 * @access  Private
 */
exports.getAllCategories = asyncHandler(async (_, res) => {
  res.status(200).json(res.advancedResults);
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
exports.createCategory = asyncHandler(async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0]; // "slug"
      const value = err.keyValue[field]; // "new-test-category-income"

      const name = req.body.name; // "New Test Category"
      const slug = value.split("-"); // ['new', 'test', 'category', 'income']
      const transactionType = slug[slug.length - 1]; // income

      return next(
        new ErrorResponse(
          `Category "${name}" already exists as ${transactionType}.`,
          400
        )
      );
    }

    return next(err);
  }
});

/**
 * @desc    Update category
 * @route   PUT /v1/categories/:id
 * @access  Private
 */
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category with id ${req.params.id} not found`, 404)
    );
  }

  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: category });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0]; // "slug"
      const value = err.keyValue[field]; // "new-test-category-income"

      const name = req.body.name; // "New Test Category"
      const slug = value.split("-"); // ['new', 'test', 'category', 'income']
      const transactionType = slug[slug.length - 1]; // income

      return next(
        new ErrorResponse(
          `Category "${name}" already exists as ${transactionType}.`,
          400
        )
      );
    }

    return next(err);
  }
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
