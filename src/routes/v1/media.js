const express = require("express");

const {
  getAllMedia,
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  destroyMedia,
} = require("../../controllers/media");
const { privateAdvancedResults } = require("../../middleware/advancedResults");
const { authenticate } = require("../../middleware/auth");
const filterDeletedMedia = require("../../middleware/filterDeletedMedia");
const Media = require("../../models/Media");

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .get(filterDeletedMedia, privateAdvancedResults(Media), getAllMedia)
  .post(createMedia);

router.route("/:id/hard").delete(destroyMedia);

router.route("/:id").get(getMedia).put(updateMedia).delete(deleteMedia);

module.exports = router;
