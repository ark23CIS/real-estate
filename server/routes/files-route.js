const express = require("express");
const { Profile } = require("../models");
const { deleteProfileFileCtrl } = require("../controllers");
const {
  multer: { multerUploads, datauri },
  cloudinary: { cloudinaryConfig, uploader },
} = require("../constants");
const { authMiddleware } = require("../middlewares");
const router = express.Router();

router.post(
  "/profile",
  multerUploads.single("image-raw"),
  cloudinaryConfig,
  authMiddleware,
  (req, res) => {
    const file = datauri(req);
    uploader.upload(
      file.content,
      {
        crop: "scale",
        responsive: true,
        width: "auto",
      },
      async (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Server Error");
        }
        try {
          console.log(req.user.id);
          const profile = await Profile.updateOne(
            { user: req.user.id },
            { $set: { photo: result.secure_url } }
          );
          res.json(profile);
        } catch (error) {
          console.log(error);
          console.log(error.message);
          res.status(500).send("Server Error");
        }
      }
    );
  }
);

router.delete("/profile", authMiddleware, deleteProfileFileCtrl);

module.exports = router;
