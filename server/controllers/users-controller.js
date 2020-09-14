const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const {
  nodemailer: { transporter, mailOptions },
} = require("../constants");

exports.postUserCtrl = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, password, email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    let salt = await bcrypt.genSalt(9);

    user = new User({ firstName, lastName, password, email });
    user.password = await bcrypt.hash(password, salt);
    user.confirmation_hash = await bcrypt.hash(new Date().toString(), salt);
    await user.save();
    res.json(user);
    transporter.sendMail(
      mailOptions(
        "realestate.websitee@gmail.com",
        "danstrig2000@mail.ru",
        "Testing and Testing",
        "It works"
      ),
      (err, data) => {
        if (err) console.log(err.message);
        else {
          console.log("Email.sent", data);
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

exports.confirmUserCtrl = async (req, res) => {
  const hash = req.query.hash;
  if (!hash) {
    return res.status(422).send("Invalid hash");
  }
  try {
    let result = await User.findOneAndUpdate(
      { confirmation_hash: hash },
      { $set: { confirmed: true } }
    );
    res.json({ status: "success", message: "User successfully confirmed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
