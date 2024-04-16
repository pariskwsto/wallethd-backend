const port = process.env.PORT || "5000";

const publicUploadsBasePath =
  process.env.PUBLIC_UPLOADS_BASE_PATH || "./public/uploads";

module.exports = { port, publicUploadsBasePath };
