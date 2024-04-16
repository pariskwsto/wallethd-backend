const express = require("express");

const { getAllMedia, createMedia } = require("../../controllers/media");

const advancedResults = require("../../middleware/advancedResults");
const { authenticate } = require("../../middleware/auth");

const Media = require("../../models/Media");

const router = express.Router();

router.use(authenticate);

router.route("/").get(advancedResults(Media), getAllMedia).post(createMedia);

module.exports = router;
