const express = require('express');
const { authMiddleware } = require('../middlewares');
const { Profile } = require('../models');
const {
  profileMeGetController,
  profilePostController,
  getProfileByUserIDController,
  deleteOwnProfileController,
  getAllCollectionsController,
  likeCollectionCtrl,
  dislikeCollectionCtrl,
  rateCollectionCtrl,
  commentCollectionCtrl,
  uncommentCollectionCtrl,
} = require('../controllers');
const router = express.Router();

router.get('/me', authMiddleware, profileMeGetController);

router.post('/', authMiddleware, profilePostController);

router.get('/', authMiddleware, getAllCollectionsController(Profile));

router.get('/id/:user_id', getProfileByUserIDController);

router.put('/like/:liked_collection', authMiddleware, likeCollectionCtrl(Profile, 'user'));

router.put('/dislike/:disliked_collection', authMiddleware, dislikeCollectionCtrl(Profile, 'user'));

router.put('/rate/:rated_collection', authMiddleware, rateCollectionCtrl(Profile, 'user'));

router.put(
  '/comment/:commented_collection',
  authMiddleware,
  commentCollectionCtrl(Profile, 'user'),
);

router.put(
  '/uncomment/:uncommented_collection',
  authMiddleware,
  uncommentCollectionCtrl(Profile, 'user'),
);

router.delete('/me', authMiddleware, deleteOwnProfileController);

module.exports = router;
