const express = require('express');
const { check } = require('express-validator');
const { Estate } = require('../models');
const {
  createEstate,
  getAllCollectionsController,
  likeCollectionCtrl,
  dislikeCollectionCtrl,
  rateCollectionCtrl,
  commentCollectionCtrl,
  uncommentCollectionCtrl,
  getOwnEstates,
  getADByID,
  searchEstates,
} = require('../controllers');
const { authMiddleware } = require('../middlewares');
const router = express.Router();

router.post(
  '/',
  [
    authMiddleware,
    check('title', 'Title is required').exists(),
    check('text', 'Text is required').exists(),
    check('contactNumber', 'Contact number is required').exists(),
    check('price', 'Price is required').exists(),
    check('footage', 'Footage is required').exists(),
    check('region', 'Region is required').exists(),
    check('price', 'price should be a number').isNumeric(),
    check('footage', 'footage should be a number').isNumeric(),
  ],
  createEstate,
);

router.get('/', getAllCollectionsController(Estate));

router.get('/search', searchEstates);

router.get('/me', authMiddleware, getOwnEstates);

router.get('/id/:ad_id', getADByID(Estate));

router.put('/like/:liked_collection', authMiddleware, likeCollectionCtrl(Estate, '_id'));

router.put('/dislike/:disliked_collection', authMiddleware, dislikeCollectionCtrl(Estate, '_id'));

router.put('/rate/:rated_collection', authMiddleware, rateCollectionCtrl(Estate, '_id'));

router.put('/comment/:commented_collection', authMiddleware, commentCollectionCtrl(Estate, '_id'));

router.put(
  '/uncomment/:uncommented_collection',
  authMiddleware,
  uncommentCollectionCtrl(Estate, '_id'),
);

module.exports = router;
