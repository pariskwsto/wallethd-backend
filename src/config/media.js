const { publicUploadsBasePath } = require("./express");

const acceptedMimetypes = ["image/jpeg", "image/png", "application/pdf"];

const mediaUploadsRelativePath =
  process.env.MEDIA_UPLOADS_RELATIVE_PATH || "/media";

const mediaUploadsFullPath = `${publicUploadsBasePath}/${mediaUploadsRelativePath}`;

const mediaUploadsSizeLimit = process.env.MEDIA_UPLOADS_SIZE_LIMIT || 1000000;

module.exports = {
  acceptedMimetypes,
  mediaUploadsFullPath,
  mediaUploadsSizeLimit,
};
