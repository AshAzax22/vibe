const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

const connectDB = async () => {
  try {
    console.log("accessing mongo function");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
