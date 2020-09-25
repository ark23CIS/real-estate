const { confirmUserCtrl, postUserCtrl } = require("./users-controller");
const { authGetController, authPostController } = require("./auth-controller");
const {
  profileMeGetController,
  profilePostController,
  getProfileByUserIDController,
  deleteOwnProfileController,
} = require("./profile-controller");
const { deleteProfileFileCtrl } = require("./filesCtrl");
const { Profile } = require("../models");
const { createEstate, deleteEstate, getOwnEstates } = require("./estateCtrl");
const { createRenter, deleteRenter, getOwnRenters } = require("./renterCtrl");

const getAllCollectionsController = (Model) => async (req, res) => {
  try {
    const collections = await Model.find().populate(
      "user",
      "-password -confirmation_hash"
    );
    res.json(collections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const likeCollectionCtrl = (Model) => async (req, res) => {
  const liked_collection_id = req.params.liked_collection;
  try {
    const collection = await Model.findOne({ user: liked_collection_id });
    let result;
    if (!collection.likes.includes(req.user.id)) {
      result = await Model.findOneAndUpdate(
        { user: liked_collection_id },
        { $push: { likes: req.user.id } },
        { new: true }
      );
    } else {
      result = await Model.findOneAndUpdate(
        { user: liked_collection_id },
        { $pull: { likes: req.user.id } },
        { new: true }
      );
    }
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
  // await Profile.findOneAndUpdate({ user: user_id }, {  })
};

const dislikeCollectionCtrl = (Model) => async (req, res) => {
  const disliked_collection_id = req.params.disliked_collection;
  try {
    const collection = await Model.findOne({ user: disliked_collection_id });
    let result;
    if (!collection.dislikes.includes(req.user.id)) {
      result = await Model.findOneAndUpdate(
        { user: disliked_collection_id },
        { $push: { dislikes: req.user.id } },
        { new: true }
      );
    } else {
      result = await Model.findOneAndUpdate(
        { user: disliked_collection_id },
        { $pull: { dislikes: req.user.id } },
        { new: true }
      );
    }
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const getADByID = (Model) => async (req, res) => {
  const ad_id = req.params.ad_id;
  try {
    let collection = await Model.findOneAndUpdate(
      { _id: ad_id },
      { $inc: { totalViews: 1 } },
      { new: true }
    ).populate("user", "-password -confirmation_hash");
    if (req.user) {
      if (req.user.id && !collection.usersWatched.includes(req.user.id)) {
        collection = await Model.findOneAndUpdate(
          { _id: ad_id },
          { $push: { usersWatched: req.user.id } },
          { new: true }
        ).populate("user", "-password -confirmation_hash");
      }
    }
    res.json(collection);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const rateCollectionCtrl = (Model) => async (req, res) => {
  const { rating } = req.body;
  const rated_collection_id = req.params.rated_collection;
  try {
    const collection = await Model.findOne({ user: rated_collection_id });
    const ids = collection.ratings.map(({ ratedBy }) => ratedBy);
    if (!ids.includes(req.user.id)) {
      const updatedCollection = await Model.findOneAndUpdate(
        { user: rated_collection_id },
        { $push: { ratings: { rating, ratedBy: req.user.id } } },
        { new: true }
      );
      res.json({ status: "Rating updated", collection: updatedCollection });
    } else {
      res.json({ status: "Already rated before" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const commentCollectionCtrl = (Model) => async (req, res) => {
  const { commented_collection: commented_collection_id } = req.params;
  const { text } = req.body;
  try {
    const profile = Profile.findOne({ user: req.user.id });
    let result = await Model.findOneAndUpdate(
      { _id: commented_collection_id },
      { $push: { comments: { text, postedBy: profile._id } } },
      { new: true }
    )
      .populate("user")
      .populate({
        path: "comments.postedBy",
        model: "profile",
        populate: { path: "user", model: "user" },
      });
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const uncommentCollectionCtrl = (Model) => async (req, res) => {
  const { uncommented_collection: uncommentedCollectionID } = req.params;
  const { commentID } = req.body;
  try {
    const collection = await Model.findOne({
      _id: uncommentedCollectionID,
    })
      .populate("user")
      .populate({
        path: "comments.postedBy",
        model: "profile",
        populate: { path: "user", model: "user" },
      });
    const comments = collection.comments.filter(({ id }) => id !== commentID);
    const result = await collection
      .findOneAndUpdate(
        { user: uncommentedCollectionID },
        { $set: { comments } },
        { new: true }
      )
      .populate("user comments.postedBy", "-password -confirmation_hash");
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
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
  deleteProfileFileCtrl,
  createRenter,
  deleteRenter,
  getOwnRenters,
  createEstate,
  deleteEstate,
  getOwnEstates,
  uncommentCollectionCtrl,
  commentCollectionCtrl,
  rateCollectionCtrl,
  dislikeCollectionCtrl,
  likeCollectionCtrl,
  getAllCollectionsController,
  getADByID,
};
