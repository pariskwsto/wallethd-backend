const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a category name"],
      maxlength: [50, "Category name can not be more than 50 characters"],
      unique: true,
      trim: true,
    },
    slug: String,
    description: {
      type: String,
      maxlength: [
        250,
        "Category description can not be more than 250 characters",
      ],
    },
    icon: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// create category slug from the name
CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// reverse populate with virtuals
CategorySchema.virtual("subcategories", {
  ref: "Subcategory",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});

module.exports = mongoose.model("Category", CategorySchema, "categories");
