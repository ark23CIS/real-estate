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
  commentProfileCtrl,
  uncommentProfileCtrl,
} = require("./profile-controller");
const { deleteProfileFileCtrl } = require("./filesCtrl");
const { createEstate } = require("./estateCtrl");
const { createRenter } = require("./renterCtrl");

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
  deleteProfileFileCtrl,
  likeProfileCtrl,
  dislikeProfileCtrl,
  rateProfileCtrl,
  commentProfileCtrl,
  uncommentProfileCtrl,
  createRenter,
  createEstate,
};
