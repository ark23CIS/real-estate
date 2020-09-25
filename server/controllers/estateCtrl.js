const { validationResult } = require("express-validator");
const { Estate } = require("../models");

exports.createEstate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    region,
    footage,
    price,
    text,
    title,
    contactNumber,
    estateAddress,
    photos,
  } = req.body;
  const estate = new Estate({
    region,
    footage,
    price,
    text,
    title,
    contactNumber,
    user: req.user.id,
    estateAddress,
    photos,
  });
  try {
    const result = await estate.save();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getOwnEstates = async (req, res) => {
  try {
    const estates = await Estate.find({ user: req.user.id }).populate(
      "user",
      "-password -confirmation_hash"
    );
    res.json(estates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllEstates = async (req, res) => {
  try {
    const estates = await Estate.find().populate(
      "user",
      "-password -confirmation_hash"
    );
    res.json(estates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteEstate = async (req, res) => {
  const { estateID, user_id } = req.body;
  if (req.user.id != user_id) {
    res.status(400).json({ status: "You cannot delete the renter ad" });
  }
  try {
    await Estate.findOneAndRemove({ id: estateID });
    res.json({ status: "Estate has been removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
