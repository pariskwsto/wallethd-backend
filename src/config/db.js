const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    autoIndex: process.env.NODE_ENV !== "production",
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline);
};

module.exports = { connectDB };
