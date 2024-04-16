const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

/**
 * @desc    Register user
 * @route   POST /v1/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  // create user
  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  // grab token and send to email
  const confirmEmailToken = user.generateEmailConfirmToken();

  // create reset url
  const confirmEmailURL = `${req.protocol}://${req.get(
    "host"
  )}/v1/auth/confirm-email?token=${confirmEmailToken}`;

  const message = `You are receiving this email because you need to confirm your email address. Please make a GET request to: \n\n ${confirmEmailURL}`;

  // REVIEW
  user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user.email,
    subject: "Email confirmation token",
    message,
  });

  sendTokenResponse(user, 200, res);
});

/**
 * @desc    Login user
 * @route   POST /v1/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// get token from model, create cookie, and send response
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie(process.env.JTW_COOKIE_NAME, token, options)
    .json({
      success: true,
      token,
    });
};
