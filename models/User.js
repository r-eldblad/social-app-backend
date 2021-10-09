const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      max: 1024,
    },
    sentFrom: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    posts: [postSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
