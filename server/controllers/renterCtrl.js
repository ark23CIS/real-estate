const { validationResult } = require('express-validator');
const { Renter } = require('../models');

exports.createRenter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { region, footage, maxPrice, text, title, contactNumber, photos } = req.body;
  const renter = new Renter({
    title,
    region,
    footage,
    maxPrice,
    text,
    contactNumber,
    user: req.user.id,
    photos,
  });
  try {
    const result = await renter.save();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.searchRenters = async (req, res) => {
  try {
    const { searchquery, minprice, maxFootage, minFootage, sortBy } = req.query;
    let renters = await Renter.find({
      $and: [
        { maxPrice: { $gte: minprice } },
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
      renters = renters.sort((a, b) => {
        if (a.totalRating > b.totalRating) return -1;
        else if (a.totalRating === b.totalRating) return a.maxPrice > b.maxPrice ? -1 : 1;
        return 1;
      });
    }
    renters = renters.reduce((p, c) => {
      const adText = `${c.title} ${c.text}`.replace(/ +/g, '').toLowerCase();
      return adText.includes(searchquery.toLowerCase()) ? [...p, c] : [...p];
    }, []);
    res.json(renters);
  } catch (err) {
    console.log(err.message);
  }
};

exports.getOwnRenters = async (req, res) => {
  try {
    let result = await Renter.find({ user: req.user.id });
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteRenter = async (req, res) => {
  const { user_id, renterID } = req.body;
  if (req.user.id !== user_id) {
    return res.status(400).json({ status: 'You cannot delete the renter ad' });
  }
  try {
    await Renter.findOneAndRemove({ id: renterID });
    res.json({ status: 'Renter ad has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
