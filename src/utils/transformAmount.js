const Decimal = require("decimal.js");

exports.transformAmountToInteger = (amount) => {
  return parseFloat((amount * 100).toFixed(2));
};

exports.transformAmountToFloat = (amount) => {
  return new Decimal(amount).dividedBy(100).toFixed(2);
};
