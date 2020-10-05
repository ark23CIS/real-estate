require('dotenv').config();
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { nodemailer } = require('../constants');

exports.postUserCtrl = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, password, email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    let salt = await bcrypt.genSalt(9);

    user = new User({ firstName, lastName, password, email });
    user.password = await bcrypt.hash(password, salt);
    user.confirmation_hash = await bcrypt.hash(new Date().toString(), salt);
    await user.save();
    res.json(user);
    nodemailer.sendMail(
      {
        to: user.email,
        subject: 'Email confirmation Real Estate',
        html: `Hi, ${user.fullName}. For email confirmation follow <a href="http://localhost:${process.env.PORT}/#/check-info?hash=${user.confirmation_hash}">the link</a>`,
      },
      function (err, info) {
        if (err) console.log(err);
        else {
          console.log(info);
        }
      },
    );
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.confirmUserCtrl = async (req, res) => {
  const hash = req.query.hash;
  if (!hash) {
    return res.status(422).send('Invalid hash');
  }
  try {
    const user = await User.findOneAndUpdate(
      { confirmation_hash: hash },
      { $set: { confirmed: true } },
      { new: true },
    );
    res.json(user);
  } catch (err) {
    res.json({ confirmation_status: 'error' });
  }
};
