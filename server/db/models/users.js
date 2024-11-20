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
  pollsCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "polls",
    },
  ],
  pollsVoted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "polls",
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
