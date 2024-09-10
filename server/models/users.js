const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
  avatar: {
    type: Number,
  },
});

module.exports = mongoose.model("users", userSchema);
