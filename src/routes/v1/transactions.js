const express = require("express");

const {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../../controllers/transactions");

const { privateAdvancedResults } = require("../../middleware/advancedResults");
const { authenticate } = require("../../middleware/auth");
const Transaction = require("../../models/Transaction");

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .get(privateAdvancedResults(Transaction), getAllTransactions)
  .post(createTransaction);

router
  .route("/:id")
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
