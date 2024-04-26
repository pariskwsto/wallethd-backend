const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const {
  acceptedMimetypes,
  mediaUploadsFullPath,
  mediaUploadsSizeLimit,
} = require("../config/media");
const asyncHandler = require("../middleware/asyncHandler");
const Media = require("../models/Media");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc    Get all media
 * @route   GET /v1/media
 * @access  Private
 */
exports.getAllMedia = asyncHandler(async (_, res) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @desc    Get single media
 * @route   GET /v1/media/:id
 * @access  Private
 */
exports.getMedia = asyncHandler(async (req, res, next) => {
  const media = await Media.findById(req.params.id);

  if (!media || media.isDeleted) {
    return next(
      new ErrorResponse(`Media with id ${req.params.id} not found`, 404)
    );
  }

  // make sure user is media owner
  if (media.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this media`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: media });
});

/**
 * @desc    Create new media
 * @route   POST /v1/media
 * @access  Private
 */
exports.createMedia = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.file) {
    return next(new ErrorResponse("Please upload a file", 400));
  }

  const { file } = req.files;

  // make sure mimetype is acceptable
  if (!acceptedMimetypes.includes(file.mimetype)) {
    const readableMimetypes = getReadableMimetypes();

    return next(
      new ErrorResponse(
        `The uploaded file type '${file.mimetype}' is not supported. Please upload one of the following accepted file types: ${readableMimetypes}.`,
        400
      )
    );
  }

  // check file size
  if (file.size > mediaUploadsSizeLimit) {
    const mediaUploadsSizeLimitMB = (
      mediaUploadsSizeLimit /
      1024 /
      1024
    ).toFixed(2);

    return next(
      new ErrorResponse(
        `The file exceeds the maximum allowed size of ${mediaUploadsSizeLimitMB} MB. Please upload a smaller file.`,
        400
      )
    );
  }

  // handle year/month directory structure
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const mediaStoragePath = path.join(`${year}`, `${month}`);
  const uploadFilePath = path.join(mediaUploadsFullPath, mediaStoragePath);

  // ensure the directory exists
  if (!fs.existsSync(uploadFilePath)) {
    fs.mkdirSync(uploadFilePath, { recursive: true });
  }

  // generate file name
  const id = crypto.randomUUID();
  const uploadFileName = `${id}-${file.name}`;

  // generate upload full directory
  const uploadFileDir = `${uploadFilePath}/${uploadFileName}`;

  file.mv(uploadFileDir, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse("Problem with file upload", 500));
    }

    const newMedia = {
      name: file.name,
      url: `${mediaStoragePath}/${uploadFileName}`,
      mimetype: file.mimetype,
      metadata: {
        originalName: file.name,
        size: file.size,
        md5: file.md5,
      },
      user: req.user.id,
    };

    try {
      const media = await Media.create(newMedia);
      res.status(201).json({ success: true, data: media });
    } catch (err) {
      if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(({ message }) => message);
        return next(new ErrorResponse(message.join(" "), 400));
      }

      return next(err);
    }
  });
});

/**
 * @desc    Update media
 * @route   PUT /v1/media/:id
 * @access  Private
 */
exports.updateMedia = asyncHandler(async (req, res, next) => {
  let media = await Media.findById(req.params.id);

  if (!media || media.isDeleted) {
    return next(
      new ErrorResponse(`Media with id ${req.params.id} not found`, 404)
    );
  }

  // make sure user is media owner
  if (media.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this media`,
        401
      )
    );
  }

  media = await Media.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: media });
});

/**
 * @desc    Delete media
 * @route   DELETE /v1/media/:id
 * @access  Private
 */
exports.deleteMedia = asyncHandler(async (req, res, next) => {
  const media = await Media.findById(req.params.id);

  if (!media || media.isDeleted) {
    return next(
      new ErrorResponse(`Media with id ${req.params.id} not found`, 404)
    );
  }

  // make sure user is media owner
  if (media.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this media`,
        401
      )
    );
  }

  media.isDeleted = true;
  media.deletedAt = new Date();
  await media.save();

  res.status(200).json({ success: true, data: {} });
});

/**
 * @desc    Destroy (hard delete) media
 * @route   DELETE /v1/media/:id/hard
 * @access  Private
 */
exports.destroyMedia = asyncHandler(async (req, res, next) => {
  const media = await Media.findById(req.params.id);

  if (!media) {
    return next(
      new ErrorResponse(`Media with id ${req.params.id} not found`, 404)
    );
  }

  // make sure user is media owner
  if (media.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this media`,
        401
      )
    );
  }

  if (!media.isDeleted) {
    return next(
      new ErrorResponse(
        `Media with id ${req.params.id} is not in the trash. It may have already been permanently deleted.`,
        404
      )
    );
  }

  await media.deleteOne();

  res.status(200).json({ success: true, data: {} });
});

const getReadableMimetypes = () => {
  return acceptedMimetypes
    .map((type) => {
      switch (type) {
        case "image/jpeg":
          return "JPEG images";
        case "image/png":
          return "PNG images";
        case "application/pdf":
          return "PDF documents";
        default:
          return type;
      }
    })
    .join(", ");
};
