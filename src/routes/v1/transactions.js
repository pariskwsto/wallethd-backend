const express = require("express");

const {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../../controllers/transactions");

const { authenticate } = require("../../middleware/auth");

const router = express.Router();

router.use(authenticate);

router.route("/").get(getAllTransactions).post(createTransaction);

router
  .route("/:id")
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
