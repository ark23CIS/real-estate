const usersController = require("./users-controller");
const { authGetController, authPostController } = require("./auth-controller");
const {
  profileMeGetController,
  profilePostController,
  getAllProfilesController,
  getProfileByUserIDController,
  deleteOwnProfileController,
} = require("./profile-controller");
const { postProfileFileCtrl, deleteProfileFileCtrl } = require("./filesCtrl");

module.exports = {
  usersController,
  authGetController,
  authPostController,
  profileMeGetController,
  profilePostController,
  getAllProfilesController,
  getProfileByUserIDController,
  deleteOwnProfileController,
  postProfileFileCtrl,
  deleteProfileFileCtrl,
};
