const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "options",
      required: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now, // default value
  },
});

const polls = mongoose.model("polls", pollSchema);
const options = mongoose.model("options", optionSchema);

module.exports = {
  options,
  polls,
};
