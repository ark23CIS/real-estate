const { confirmUserCtrl, postUserCtrl } = require("./users-controller");
const { authGetController, authPostController } = require("./auth-controller");
const {
  profileMeGetController,
  profilePostController,
  getAllProfilesController,
  getProfileByUserIDController,
  deleteOwnProfileController,
  likeProfileCtrl,
  dislikeProfileCtrl,
  rateProfileCtrl,
} = require("./profile-controller");
const { postProfileFileCtrl, deleteProfileFileCtrl } = require("./filesCtrl");

module.exports = {
  confirmUserCtrl,
  postUserCtrl,
  authGetController,
  authPostController,
  profileMeGetController,
  profilePostController,
  getAllProfilesController,
  getProfileByUserIDController,
  deleteOwnProfileController,
  postProfileFileCtrl,
  deleteProfileFileCtrl,
  likeProfileCtrl,
  dislikeProfileCtrl,
  rateProfileCtrl,
};
