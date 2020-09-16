const { validationResult } = require("express-validator");
const { Renter } = require("../models");

exports.createRenter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { region, footage, maxPrice, text, title, contactNumber } = req.body;
  const renter = new Renter({ ...req.body });
  try {
    const res = await renter.save();
    res.json(res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteRenter = async (req, res) => {};
