const { validationResult } = require('express-validator');
const { Renter } = require('../models');

exports.createRenter = async (req, res) => {
  let errors = [...validationResult(req).array()];
  const { region, footage, maxPrice, text, title, contactNumber, photos } = req.body;
  if (!/^\+?[0-9]{6,12}$/g.test(contactNumber)) {
    errors = [...errors, { msg: 'Input a real contact number' }];
  }
  if (errors.length) {
    return res.status(400).json({ errors });
  }

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
    res.status(500).send('Server Error');
  }
};

exports.getOwnRenters = async (req, res) => {
  try {
    let result = await Renter.find({ user: req.user.id });
    res.json(result);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteRenter = async (req, res) => {
  const { renterID } = req.params;
  try {
    await Renter.findOneAndRemove({ _id: renterID });
    res.json({ status: 'Renter ad has been deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
