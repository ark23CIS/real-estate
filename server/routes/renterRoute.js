const express = require("express");
const { check } = require("express-validator");
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
} = require("../controllers");
const { authMiddleware } = require("../middlewares");
const { Renter } = require("../models");
const router = express.Router();

router.post(
  "/",
  [
    authMiddleware,
    check("title", "Title is required").exists(),
    check("text", "Text is required").exists(),
    check("contactNumber", "Contact number is required").exists(),
    check("maxPrice", "Max price is required").exists(),
    check("footage", "Footage is required").exists(),
    check("region", "Region is required").exists(),
  ],
  createRenter
);

router.get("/", authMiddleware, getAllCollectionsController(Renter));

router.get("/me", authMiddleware, getOwnRenters);

router.put(
  "/like/:liked_collection",
  authMiddleware,
  likeCollectionCtrl(Renter)
);

router.put(
  "/dislike/:disliked_collection",
  authMiddleware,
  dislikeCollectionCtrl(Renter)
);

router.put(
  "/rate/:rated_collection",
  authMiddleware,
  rateCollectionCtrl(Renter)
);

router.put(
  "/comment/:commented_collection",
  authMiddleware,
  commentCollectionCtrl(Renter)
);

router.put(
  "/uncomment/:uncommented_collection",
  authMiddleware,
  uncommentCollectionCtrl(Renter)
);

router.delete("/", authMiddleware, deleteRenter);

module.exports = router;
