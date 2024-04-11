const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [50, "Username can not be more than 50 characters"],
      match: [
        /^[a-z0-9]+$/,
        "Username can only contain lowercase letters and numbers",
      ],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "viewer"],
      default: "user",
    },
    firstName: String,
    lastName: String,
    profileImage: {
      type: String,
      default: "no-profile-photo.jpg",
    },
    // user confirmation
    confirmEmailToken: String,
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    // reset password
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // two-factor authentication
    twoFactorCode: String,
    twoFactorCodeExpire: Date,
    twoFactorEnable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("username")) {
    this.username = this.username.toLowerCase();
  }
  next();
});

module.exports = mongoose.model("User", UserSchema, "users");
