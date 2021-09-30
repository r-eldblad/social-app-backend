const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');
const User = require('../models/User');

router.get('/', verifyToken, async (req, res) => {
  const user = await User.findById(req['user']);
  res.send(user);
});

module.exports = router;
