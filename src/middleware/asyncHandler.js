const asyncHandler = (fn, modelName) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    if (err.code === 11000 && modelName) {
      err.modelName = modelName;
    }
    next(err);
  }
};

module.exports = asyncHandler;
