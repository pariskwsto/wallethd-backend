const express = require("express");

const {
  register,
  login,
  logout,
  getProfile,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  confirmEmail,
} = require("../../controllers/auth");

const { authenticate } = require("../../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", authenticate, getProfile);
router.put("/update-details", authenticate, updateDetails);
router.put("/update-password", authenticate, updatePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);
router.get("/confirm-email", confirmEmail);

module.exports = router;
