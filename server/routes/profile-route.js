const express = require("express");
const { authMiddleware } = require("../middlewares");
const {
  profileMeGetController,
  profilePostController,
  getAllProfilesController,
  getProfileByUserIDController,
} = require("../controllers");
const {
  deleteOwnProfileController,
} = require("../controllers/profile-controller");
const router = express.Router();

router.get("/me", authMiddleware, profileMeGetController);

router.post("/", authMiddleware, profilePostController);

router.get("/", authMiddleware, getAllProfilesController);

router.get("/id/:user_id", authMiddleware, getProfileByUserIDController);

router.delete("/me", authMiddleware, deleteOwnProfileController);

module.exports = router;
