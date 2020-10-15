const express = require('express');
const { check } = require('express-validator');
const {
  createRenter,
  getAllCollectionsController,
  likeCollectionCtrl,
  dislikeCollectionCtrl,
  rateCollectionCtrl,
  commentCollectionCtrl,
  uncommentCollectionCtrl,
  deleteRenter,
  getOwnRenters,
  getADByID,
  getADsByUserID,
  searchRenters,
} = require('../controllers');
const { authMiddleware } = require('../middlewares');
const { Renter } = require('../models');
const router = express.Router();

router.post(
  '/',
  [
    authMiddleware,
    check('title', 'Title is required').not().isEmpty(),
    check('text', 'Text is required').not().isEmpty(),
    check('contactNumber', 'Contact number is required').not().isEmpty(),
    check('maxPrice', 'Max price is required').not().isEmpty(),
    check('footage', 'Footage is required').not().isEmpty(),
    check('maxPrice', 'Max price should be a number').isNumeric(),
    check('footage', 'Footage should be a number').isNumeric(),
  ],
  createRenter,
);

router.get('/', getAllCollectionsController(Renter));

router.get('/user/:userID', getADsByUserID(Renter));

router.get('/search', searchRenters);

router.get('/me', authMiddleware, getOwnRenters);

router.put('/like/:liked_collection', authMiddleware, likeCollectionCtrl(Renter, '_id'));

router.get('/id/:ad_id', getADByID(Renter));

router.put('/dislike/:disliked_collection', authMiddleware, dislikeCollectionCtrl(Renter, '_id'));

router.put('/rate/:rated_collection', authMiddleware, rateCollectionCtrl(Renter, '_id'));

router.put('/comment/:commented_collection', authMiddleware, commentCollectionCtrl(Renter, '_id'));

router.put(
  '/uncomment/:uncommented_collection',
  authMiddleware,
  uncommentCollectionCtrl(Renter, '_id'),
);

router.delete('/:renterID', authMiddleware, deleteRenter);

module.exports = router;
