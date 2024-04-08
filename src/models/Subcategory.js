const mongoose = require("mongoose");
const slugify = require("slugify");

const SubcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a subcategory name"],
      maxlength: [50, "Subcategory name can not be more than 50 characters"],
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
        "Subcategory description can not be more than 250 characters",
      ],
    },
    icon: String,
    order: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    // enable automatic createdAt and updatedAt fields
    timestamps: true,
  }
);

// create subcategory slug from the name and category
SubcategorySchema.pre("save", function (next) {
  this.slug = slugify(`${this.name}-${this.category}`, { lower: true });
  next();
});

// update category slug from the name and category
SubcategorySchema.pre("findOneAndUpdate", async function (next) {
  const { name, category } = this.getUpdate();

  if (name || category) {
    const currentDocument = await this.model.findOne(this.getQuery());

    const updatedSlug = slugify(
      `${name || currentDocument.name}-${category || currentDocument.category}`,
      {
        lower: true,
      }
    );
    this.set({ slug: updatedSlug });
  }

  next();
});

module.exports = mongoose.model(
  "Subcategory",
  SubcategorySchema,
  "subcategories"
);
