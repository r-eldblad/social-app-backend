const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exist');

  // hashes password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Creates a new user and saves it inside of the database
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const validPass = await bcrypt.compare(req.body.password, user.password);
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  if (!user) return res.status(400).send('Email does not exist.');
  if (!validPass) return res.status(400).send('Invalid password.');

  res.header('auth-token', token).send(token);
});

module.exports = router;
