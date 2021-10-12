const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");
const verifyToken = require("../middlewares/verifyToken");

// Model imports
const Post = require("../models/Post");
const User = require("../models/User");

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const posts = await Post.find({
    _id: { $in: user.posts },
  });

  res.send(posts);
});

router.post("/create", async (req, res) => {
  const post = await new Post({
    _id: mongoose.Types.ObjectId(),
    senderId: req.body.senderId,
    user: req.body.userId,
    message: req.body.message,
  });

  await User.findOneAndUpdate(
    { _id: post.user },
    { $push: { posts: post._id } }
  );

  await post.save();
  res.send("Comment was added successfully");
});

module.exports = router;
