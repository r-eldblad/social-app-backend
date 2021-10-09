const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");

// This route returns a current logged in user
router.get("/", verifyToken, async (req, res) => {
  const user = await User.findById(req["user"]);
  res.send(user);
});

// This route returns all users
router.get("/list", verifyToken, async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/profile/:id", verifyToken, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

module.exports = router;
