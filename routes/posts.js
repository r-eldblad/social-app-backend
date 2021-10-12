const router = require("express").Router();
const mongoose = require("mongoose");
const verifyToken = require("../middlewares/verifyToken");

// Model imports
const Post = require("../models/Post");
const User = require("../models/User");

router.get("/:id", verifyToken, async (req, res) => {
  const user = await User.findById(req.params.id);
  const posts = await Post.find({
    _id: { $in: user.posts },
  });

  res.send(posts);
});

router.post("/create", verifyToken, async (req, res) => {
  const post = await new Post({
    // ID:et på posten
    _id: mongoose.Types.ObjectId(),
    // ID:et på den som skickar inlägget
    senderId: req.body.senderId,
    // ID:et på användaren som posten tillhör
    user: req.body.userId,
    // meddelandet
    message: req.body.message,
  });

  await User.findOneAndUpdate(
    { _id: post.user },
    { $push: { posts: post._id } }
  );

  await post.save();
  res.send("Comment was added successfully");
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id);
  await User.updateOne({ _id: post.user }, { $pull: { posts: post.id } });

  await Post.deleteOne({ _id: req.params.id });
  res.send("Post was deleted successfully!");
});

module.exports = router;
