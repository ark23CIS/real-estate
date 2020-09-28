const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../constants');
const { User } = require('../models');

exports.authGetController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`${err.message}`);
  }
};

exports.authPostController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { password, email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'This account is not registered' }] });
    }
    let passwordsAreEqual = await bcrypt.compare(password, user.password);
    if (!passwordsAreEqual) {
      return res.status(400).json({ errors: [{ msg: 'Incorrect password! Try one more time' }] });
    }
    if (!user.confirmed) {
      return res.status(400).json({
        errors: [
          {
            msg: 'You should confirm your email and only then try to log in',
          },
        ],
      });
    }
    let payload = {
      id: user.id,
    };
    jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
