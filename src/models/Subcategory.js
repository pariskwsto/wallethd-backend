const mongoose = require("mongoose");
const slugify = require("slugify");

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a subcategory name"],
    maxlength: [50, "Subcategory name can not be more than 50 characters"],
    unique: true,
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    maxlength: [
      250,
      "Subcategory description can not be more than 250 characters",
    ],
  },
  icon: String,
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

// create subcategory slug from the name
SubcategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model(
  "Subcategory",
  SubcategorySchema,
  "subcategories"
);
