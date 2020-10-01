const { confirmUserCtrl, postUserCtrl } = require('./users-controller');
const { authGetController, authPostController } = require('./auth-controller');
const {
  profileMeGetController,
  profilePostController,
  getProfileByUserIDController,
  deleteOwnProfileController,
} = require('./profile-controller');
const { Profile } = require('../models');
const { createEstate, deleteEstate, getOwnEstates, searchEstates } = require('./estateCtrl');
const { createRenter, deleteRenter, getOwnRenters, searchRenters } = require('./renterCtrl');
const {
  createReservation,
  getOwnReservations,
  deleteReservation,
  updateReservation,
} = require('./reservationCtrl');

const getAllCollectionsController = (Model) => async (req, res) => {
  try {
    const collections = await Model.find()
      .populate('user', '-password -confirmation_hash')
      .populate({
        path: 'comments.postedBy',
        model: 'profile',
        populate: { path: 'user', model: 'user' },
      });
    res.json(collections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const likeCollectionCtrl = (Model, fieldToSearch) => async (req, res) => {
  const liked_collection_id = req.params.liked_collection;
  try {
    const collection = await Model.findOne({
      [fieldToSearch]: liked_collection_id,
    })
      .populate('user')
      .populate({
        path: 'comments.postedBy',
        model: 'profile',
        populate: { path: 'user', model: 'user' },
      });
    let result;
    if (!collection.likes.includes(req.user.id)) {
      result = await Model.findOneAndUpdate(
        { [fieldToSearch]: liked_collection_id },
        { $push: { likes: req.user.id } },
        { new: true },
      )
        .populate('user')
        .populate({
          path: 'comments.postedBy',
          model: 'profile',
          populate: { path: 'user', model: 'user' },
        });
      result = await Model.findOneAndUpdate(
        {
          [fieldToSearch]: liked_collection_id,
        },
        {
          $pull: { dislikes: req.user.id },
        },
        { new: true },
      )
        .populate('user')
        .populate({
          path: 'comments.postedBy',
          model: 'profile',
          populate: { path: 'user', model: 'user' },
        });
    } else {
      result = await Model.findOneAndUpdate(
        { [fieldToSearch]: liked_collection_id },
        { $pull: { likes: req.user.id } },
        { new: true },
      )
        .populate('user')
        .populate({
          path: 'comments.postedBy',
          model: 'profile',
          populate: { path: 'user', model: 'user' },
        });
    }
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

const dislikeCollectionCtrl = (Model, fieldToSearch) => async (req, res) => {
  const disliked_collection_id = req.params.disliked_collection;
  try {
    const collection = await Model.findOne({
      [fieldToSearch]: disliked_collection_id,
    });
    let result;
    if (!collection.dislikes.includes(req.user.id)) {
      result = await Model.findOneAndUpdate(
        { [fieldToSearch]: disliked_collection_id },
        { $push: { dislikes: req.user.id } },
        { new: true },
      )
        .populate('user')
        .populate({
          path: 'comments.postedBy',
          model: 'profile',
          populate: { path: 'user', model: 'user' },
        });
      result = await Model.findOneAndUpdate(
        { [fieldToSearch]: disliked_collection_id },
        { $pull: { likes: req.user.id } },
        { new: true },
      )
        .populate('user')
        .populate({
          path: 'comments.postedBy',
          model: 'profile',
          populate: { path: 'user', model: 'user' },
        });
    } else {
      result = await Model.findOneAndUpdate(
        { [fieldToSearch]: disliked_collection_id },
        { $pull: { dislikes: req.user.id } },
        { new: true },
      )
        .populate('user')
        .populate({
          path: 'comments.postedBy',
          model: 'profile',
          populate: { path: 'user', model: 'user' },
        });
    }
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

const getADByID = (Model) => async (req, res) => {
  const ad_id = req.params.ad_id;
  try {
    let collection = await Model.findOneAndUpdate(
      { _id: ad_id },
      { $inc: { totalViews: 1 } },
      { new: true },
    )
      .populate('user', '-password -confirmation_hash')
      .populate({
        path: 'comments.postedBy',
        model: 'profile',
        populate: { path: 'user', model: 'user' },
      });
    if (!collection) {
      return res.status(404).send('Not an appropriate request');
    }
    if (req.user) {
      const watchedThePage = collection ? collection.usersWatched.includes(req.user.id) : false;
      if (req.user.id && !watchedThePage) {
        collection = await Model.findOneAndUpdate(
          { _id: ad_id },
          { $push: { usersWatched: req.user.id } },
          { new: true },
        )
          .populate('user', '-password -confirmation_hash')
          .populate({
            path: 'comments.postedBy',
            model: 'profile',
            populate: { path: 'user', model: 'user' },
          });
      }
    }
    res.json(collection);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

const rateCollectionCtrl = (Model, fieldToSearch) => async (req, res) => {
  const { rating } = req.body;
  const rated_collection_id = req.params.rated_collection;
  try {
    let collection = await Model.findOne({
      [fieldToSearch]: rated_collection_id,
    })
      .populate('user', '-password -confirmation_hash')
      .populate({
        path: 'comments.postedBy',
        model: 'profile',
        populate: { path: 'user', model: 'user' },
      });
    const ids = collection.ratings.map(({ ratedBy }) => ratedBy);
    if (!ids.includes(req.user.id)) {
      collection = await Model.findOneAndUpdate(
        { [fieldToSearch]: rated_collection_id },
        { $push: { ratings: { rating, ratedBy: req.user.id } } },
        { new: true },
      )
        .populate('user', '-password -confirmation_hash')
        .populate({
          path: 'comments.postedBy',
          model: 'profile',
          populate: { path: 'user', model: 'user' },
        });
    }
    res.json(collection);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

const commentCollectionCtrl = (Model, fieldToSearch) => async (req, res) => {
  const { commented_collection: commented_collection_id } = req.params;
  const { text } = req.body;
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    let result = await Model.findOneAndUpdate(
      { [fieldToSearch]: commented_collection_id },
      { $push: { comments: { text, postedBy: profile._id } } },
      { new: true },
    )
      .populate('user', '-password -confirmation_hash')
      .populate({
        path: 'comments.postedBy',
        model: 'profile',
        populate: { path: 'user', model: 'user' },
      });
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

const uncommentCollectionCtrl = (Model, fieldToSearch) => async (req, res) => {
  const { uncommented_collection: uncommentedCollectionID } = req.params;
  const { commentID } = req.body;
  try {
    const collection = await Model.findOne({
      [fieldToSearch]: uncommentedCollectionID,
    });
    const comments = collection.comments.filter(({ id }) => id !== commentID);
    const result = await Model.findOneAndUpdate(
      { [fieldToSearch]: uncommentedCollectionID },
      { $set: { comments } },
      { new: true },
    )
      .populate('user', '-password -confirmation_hash')
      .populate({
        path: 'comments.postedBy',
        model: 'profile',
        populate: { path: 'user', model: 'user' },
      });
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  confirmUserCtrl,
  postUserCtrl,
  authGetController,
  authPostController,
  profileMeGetController,
  profilePostController,
  getProfileByUserIDController,
  deleteOwnProfileController,
  createRenter,
  deleteRenter,
  getOwnRenters,
  searchRenters,
  createEstate,
  deleteEstate,
  getOwnEstates,
  searchEstates,
  uncommentCollectionCtrl,
  commentCollectionCtrl,
  rateCollectionCtrl,
  dislikeCollectionCtrl,
  likeCollectionCtrl,
  getAllCollectionsController,
  getADByID,
  createReservation,
  getOwnReservations,
  deleteReservation,
  updateReservation,
};
