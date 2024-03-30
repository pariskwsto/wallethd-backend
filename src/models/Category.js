const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a category name"],
    maxlength: [60, "Category name can not be more than 60 characters"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: [
      250,
      "Category description can not be more than 250 characters",
    ],
  },
  order: {
    type: Number,
    default: 0,
  },
  transactionType: {
    type: String,
    required: [true, "Please add a transaction type"],
    enum: ["income", "expense"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", CategorySchema, "categories");
