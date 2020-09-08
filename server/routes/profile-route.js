const express = require("express");
const { authMiddleware } = require("../middlewares");
const {
  profileMeGetController,
  profilePostController,
  getAllProfilesController,
  getProfileByUserIDController,
  deleteOwnProfileController,
} = require("../controllers");
const router = express.Router();

router.get("/me", authMiddleware, profileMeGetController);

router.post("/", authMiddleware, profilePostController);

router.get("/", authMiddleware, getAllProfilesController);

router.get("/id/:user_id", authMiddleware, getProfileByUserIDController);

router.delete("/me", authMiddleware, deleteOwnProfileController);

module.exports = router;
