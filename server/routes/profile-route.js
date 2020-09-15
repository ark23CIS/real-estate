const express = require("express");
const { authMiddleware } = require("../middlewares");
const {
  profileMeGetController,
  profilePostController,
  getAllProfilesController,
  getProfileByUserIDController,
  deleteOwnProfileController,
  likeProfileCtrl,
  dislikeProfileCtrl,
  rateProfileCtrl,
} = require("../controllers");
const router = express.Router();

router.get("/me", authMiddleware, profileMeGetController);

router.post("/", authMiddleware, profilePostController);

router.get("/", authMiddleware, getAllProfilesController);

router.get("/id/:user_id", authMiddleware, getProfileByUserIDController);

router.put("/like/:liked_user", authMiddleware, likeProfileCtrl);

router.put("/dislike/:disliked_user", authMiddleware, dislikeProfileCtrl);

router.put("/rate/:rated_user", authMiddleware, rateProfileCtrl);

router.delete("/me", authMiddleware, deleteOwnProfileController);

module.exports = router;
