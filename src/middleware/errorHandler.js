const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // log to console for dev
  // console.log(err.stack.red);
  // console.log("err", err);
  // console.log("err.modelName", err.modelName);
  // console.log("err.name", err.name);
  // console.log("err.code", err.code);
  // console.log("err.message", err.message);

  // mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(({ message }) => message);
    error = new ErrorResponse(message, 400);
  }

  // mongoose bad object id
  if (err.name === "CastError") {
    const modelName = err?.model?.modelName || "Resource";
    const message = `${modelName} not found.`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate entry. The provided data already exists.";
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
