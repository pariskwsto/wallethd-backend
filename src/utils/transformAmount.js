const Decimal = require("decimal.js");

const transformAmountToInteger = (amount) => {
  return parseFloat((amount * 100).toFixed(2));
};

const transformAmountToFloat = (amount) => {
  return new Decimal(amount).dividedBy(100).toFixed(2);
};

module.exports = { transformAmountToInteger, transformAmountToFloat };
