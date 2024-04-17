const mongoose = require("mongoose");
const {
  transactionTypes,
  transactionStatuses,
} = require("../config/transactions");

const {
  transformAmountToInteger,
  transformAmountToFloat,
} = require("../utils/transformAmount");

const TransactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Please add a transaction type"],
      enum: transactionTypes,
    },
    date: {
      type: Date,
      required: [true, "Please add a transaction date"],
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Please add a payment method"],
    },
    note: {
      type: String,
      maxlength: [50, "Note can not be more than 50 characters"],
    },
    facility: {
      type: String,
      maxlength: [50, "Facility can not be more than 50 characters"],
    },
    description: {
      type: String,
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    status: {
      type: String,
      required: [true, "Please add a transaction status"],
      enum: transactionStatuses,
    },
    receiptTaken: {
      type: Boolean,
      default: false,
    },
    isInstallment: {
      type: Boolean,
      default: false,
    },
    isReadyToDeduct: {
      type: Boolean,
      default: true,
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    dueDate: Date,
    reminderDate: Date,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please select a category"],
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TransactionSchema.post("find", function (docs) {
  docs.forEach((doc) => {
    doc.amount = transformAmountToFloat(doc.amount);
  });
});

TransactionSchema.post("findOne", function (doc) {
  if (doc) {
    doc.amount = transformAmountToFloat(doc.amount);
  }
});

TransactionSchema.pre("save", function () {
  this.amount = transformAmountToInteger(this.amount);
});

TransactionSchema.post("save", function (doc) {
  doc.amount = transformAmountToFloat(doc.amount);
});

TransactionSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();

  if (update.amount) {
    update.amount = transformAmountToInteger(update.amount);
  }
});

TransactionSchema.post("findOneAndUpdate", function (doc) {
  doc.amount = transformAmountToFloat(doc.amount);
});

module.exports = mongoose.model(
  "Transaction",
  TransactionSchema,
  "transactions"
);
