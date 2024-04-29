const asyncHandler = require("../middleware/asyncHandler");
const Transaction = require("../models/Transaction");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc    Get all transactions
 * @route   GET /v1/transactions
 * @access  Private
 */
exports.getAllTransactions = asyncHandler(async (_, res) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @desc    Get single transaction
 * @route   GET /v1/transactions/:id
 * @access  Private
 */
exports.getTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(
      new ErrorResponse(`Transaction with id ${req.params.id} not found`, 404)
    );
  }

  // make sure user is transaction owner
  if (transaction.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this transaction`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: transaction });
});

/**
 * @desc    Create new transaction
 * @route   POST /v1/transactions
 * @access  Private
 */
exports.createTransaction = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;
  const transaction = await Transaction.create(req.body);
  res.status(201).json({ success: true, data: transaction });
});

/**
 * @desc    Update transaction
 * @route   PUT /v1/transactions/:id
 * @access  Private
 */
exports.updateTransaction = asyncHandler(async (req, res, next) => {
  let transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(
      new ErrorResponse(`Transaction with id ${req.params.id} not found`, 404)
    );
  }

  // make sure user is transaction owner
  if (transaction.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this transaction`,
        401
      )
    );
  }

  transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: transaction });
});

/**
 * @desc    Delete transaction
 * @route   DELETE /v1/transactions/:id
 * @access  Private
 */
exports.deleteTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(
      new ErrorResponse(`Transaction with id ${req.params.id} not found`, 404)
    );
  }

  // make sure user is transaction owner
  if (transaction.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this transaction`,
        401
      )
    );
  }

  await transaction.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
