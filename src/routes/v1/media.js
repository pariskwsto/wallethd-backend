const express = require("express");

const { getAllMedia, createMedia } = require("../../controllers/media");

const { privateAdvancedResults } = require("../../middleware/advancedResults");
const { authenticate } = require("../../middleware/auth");

const Media = require("../../models/Media");

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .get(privateAdvancedResults(Media), getAllMedia)
  .post(createMedia);

module.exports = router;
