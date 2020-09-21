const { validationResult } = require("express-validator");
const { Renter } = require("../models");

exports.createRenter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    region,
    footage,
    maxPrice,
    text,
    title,
    contactNumber,
    user,
  } = req.body;
  const renter = new Renter({
    title,
    region,
    footage,
    maxPrice,
    text,
    contactNumber,
    user,
  });
  try {
    const result = await renter.save();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getOwnRenters = async (req, res) => {
  try {
    let result = await Renter.find({ user: req.user.id });
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllRenters = async (req, res) => {
  try {
    const renters = await Renter.find();
    res.json(renters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteRenter = async (req, res) => {
  const { user, renterID } = req.body;
  if (req.body.id !== user) {
    return res.status(400).json({ status: "You cannot delete the renter ad" });
  }
  try {
    await Renter.findOneAndRemove({ id: renterID });
    res.json({ status: "Renter ad has been deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
