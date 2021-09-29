const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      max: 1024,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = moongoose.model('Post', postSchema);
