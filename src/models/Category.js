const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a category name"],
      maxlength: [50, "Category name can not be more than 50 characters"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
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
  },
  {
    // enable automatic createdAt and updatedAt fields
    timestamps: true,
    // include virtuals when document is converted to JSON
    toJSON: { virtuals: true },
    // include virtuals when document is converted to a plain object
    toObject: { virtuals: true },
  }
);

// create category slug from the name and transactionType
CategorySchema.pre("save", function (next) {
  this.slug = slugify(`${this.name}-${this.transactionType}`, { lower: true });
  next();
});

// update category slug from the name and transactionType
CategorySchema.pre("findOneAndUpdate", async function (next) {
  const { name, transactionType } = this.getUpdate();

  if (name || transactionType) {
    const currentDocument = await this.model.findOne(this.getQuery());

    const updatedSlug = slugify(
      `${name || currentDocument.name}-${
        transactionType || currentDocument.transactionType
      }`,
      {
        lower: true,
      }
    );
    this.set({ slug: updatedSlug });
  }

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
