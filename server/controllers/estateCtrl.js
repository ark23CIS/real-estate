const { validationResult } = require('express-validator');
const { Estate } = require('../models');

exports.createEstate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { region, footage, price, text, title, contactNumber, estateAddress, photos } = req.body;
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
    res.status(500).send('Server Error');
  }
};

exports.getOwnEstates = async (req, res) => {
  try {
    const estates = await Estate.find({ user: req.user.id })
      .populate('user', '-password -confirmation_hash')
      .populate({
        path: 'comments.postedBy',
        model: 'profile',
        populate: { path: 'user', model: 'user' },
      });
    res.json(estates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.searchEstates = async (req, res) => {
  try {
    const { searchquery, maxprice, minprice, maxFootage, minFootage, sortBy } = req.query;
    let estates = await Estate.find({
      $and: [
        { price: { $lte: maxprice } },
        { price: { $gte: minprice } },
        { footage: { $lte: maxFootage } },
        { footage: { $gte: minFootage } },
      ],
    })
      .populate('user')
      .populate({
        path: 'comments.postedBy',
        model: 'profile',
        populate: { path: 'user', model: 'user' },
      })
      .sort(sortBy !== 'totalRating' ? { [sortBy]: sortBy === 'price' ? 1 : -1 } : {});
    if (sortBy === 'totalRating') {
      estates = estates.sort((a, b) => {
        if (a.totalRating > b.totalRating) return -1;
        else if (a.totalRating === b.totalRating) return a.maxPrice > b.maxPrice ? -1 : 1;
        return 1;
      });
    }
    estates = estates.reduce((p, c) => {
      const adText = `${c.title} ${c.text}`.replace(/ +/g, '').toLowerCase();
      return adText.includes(searchquery.toLowerCase()) ? [...p, c] : [...p];
    }, []);
    res.json(estates);
  } catch (err) {
    console.log(err.message);
  }
};

exports.getAllEstates = async (req, res) => {
  try {
    const estates = await Estate.find()
      .populate('user', '-password -confirmation_hash')
      .populate({
        path: 'comments.postedBy',
        model: 'profile',
        populate: { path: 'user', model: 'user' },
      });
    res.json(estates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteEstate = async (req, res) => {
  const { estateID, user_id } = req.body;
  if (req.user.id != user_id) {
    res.status(400).json({ status: 'You cannot delete the renter ad' });
  }
  try {
    await Estate.findOneAndRemove({ id: estateID });
    res.json({ status: 'Estate has been removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
