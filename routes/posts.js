const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

// Model imports
const User = require('../models/User');
const Post = require('../models/Post');

router.post('/create', async (req, res) => {
  const post = new Post({
    message: req.body.message,
  });

  try {
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
