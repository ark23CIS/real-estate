const { validationResult } = require("express-validator");
const { Estate } = require("../models");

exports.createEstate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { region, footage, price, text, title, contactNumber } = req.body;
  const estate = new Estate({ ...req.body });
  try {
    const res = await estate.save();
    res.json(res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteEstate = async (req, res) => {};
