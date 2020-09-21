const express = require("express");
const { check } = require("express-validator");
const { Estate } = require("../models");
const {
  createEstate,
  getAllCollectionsController,
  likeCollectionCtrl,
  dislikeCollectionCtrl,
  rateCollectionCtrl,
  commentCollectionCtrl,
  uncommentCollectionCtrl,
  getOwnEstates,
} = require("../controllers");
const { authMiddleware } = require("../middlewares");
const router = express.Router();

router.post(
  "/",
  [
    authMiddleware,
    check("title", "Title is required").exists(),
    check("text", "Text is required").exists(),
    check("contactNumber", "Contact number is required").exists(),
    check("price", "Price is required").exists(),
    check("footage", "Footage is required").exists(),
    check("region", "Region is required").exists(),
    check("price", "Price should be a number").isNumeric(),
    check("footage", "Footage should be a number").isNumeric(),
  ],
  createEstate
);

router.get("/", authMiddleware, getAllCollectionsController(Estate));

router.get("/me", authMiddleware, getOwnEstates);

router.put(
  "/like/:liked_collection",
  authMiddleware,
  likeCollectionCtrl(Estate)
);

router.put(
  "/dislike/:disliked_collection",
  authMiddleware,
  dislikeCollectionCtrl(Estate)
);

router.put(
  "/rate/:rated_collection",
  authMiddleware,
  rateCollectionCtrl(Estate)
);

router.put(
  "/comment/:commented_collection",
  authMiddleware,
  commentCollectionCtrl(Estate)
);

router.put(
  "/uncomment/:uncommented_collection",
  authMiddleware,
  uncommentCollectionCtrl(Estate)
);

module.exports = router;
