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
  getADsByUserID,
  deleteEstate,
} = require('../controllers');
const { authMiddleware } = require('../middlewares');
const router = express.Router();

router.post(
  '/',
  [
    authMiddleware,
    check('title', 'Title is required').not().isEmpty(),
    check('text', 'Text is required').not().isEmpty(),
    check('contactNumber', 'Contact number is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('footage', 'Footage is required').not().isEmpty(),
    check('price', 'Price should be a number').isNumeric(),
    check('footage', 'Footage should be a number').isNumeric(),
  ],
  createEstate,
);

router.get('/user/:userID', getADsByUserID(Estate));

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

router.delete('/:estateID', authMiddleware, deleteEstate);

module.exports = router;
