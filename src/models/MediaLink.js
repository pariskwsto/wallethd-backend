const mongoose = require("mongoose");

const MediaLinkSchema = new mongoose.Schema({
  mediaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media",
    required: true,
  },
  linkedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  linkedModel: {
    type: String,
    required: true,
    enum: ["Transaction"],
  },
});

module.exports = mongoose.model("MediaLink", MediaLinkSchema, "medialinks");
