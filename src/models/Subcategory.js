const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a subcategory name"],
    maxlength: [60, "Subcategory name can not be more than 60 characters"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: [
      250,
      "Subcategory description can not be more than 250 characters",
    ],
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model(
  "Subcategory",
  SubcategorySchema,
  "subcategories"
);
