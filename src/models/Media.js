const mongoose = require("mongoose");
const { acceptedMimetypes } = require("../config/media");

const MediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    url: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
      enum: acceptedMimetypes,
    },
    metadata: {
      originalName: String,
      size: Number,
      md5: String,
    },
    tags: [String],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Media", MediaSchema, "media");
