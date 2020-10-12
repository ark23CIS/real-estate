const express = require('express');
const { Profile } = require('../models');
const {
  multer: { multerUploads, datauri },
  cloudinary: { cloudinaryConfig, uploader },
} = require('../constants');
const { authMiddleware } = require('../middlewares');
const router = express.Router();

router.put(
  '/profile',
  multerUploads.single('file'),
  cloudinaryConfig,
  authMiddleware,
  (req, res) => {
    const file = datauri(req);
    uploader.upload(
      file.content,
      {
        crop: 'scale',
        responsive: true,
        width: 'auto',
      },
      async (err, result) => {
        if (err) {
          return res.status(500).send('Server Error');
        }
        try {
          await Profile.updateOne({ user: req.user.id }, { $set: { photo: result.secure_url } });
          res.json({ photo: result.secure_url });
        } catch (error) {
          res.status(500).send('Server Error');
        }
      },
    );
  },
);

router.post(
  '/estate',
  multerUploads.single('file'),
  cloudinaryConfig,
  authMiddleware,
  (req, res) => {
    const file = datauri(req);
    uploader.upload(
      file.content,
      {
        crop: 'scale',
        responsive: true,
        width: 'auto',
      },
      (err, result) => {
        if (err) {
          return res.status(500).send('Server Error');
        }
        return res.json({ photo: result.secure_url });
      },
    );
  },
);

router.post(
  '/renter',
  multerUploads.single('file'),
  cloudinaryConfig,
  authMiddleware,
  (req, res) => {
    const file = datauri(req);
    uploader.upload(
      file.content,
      {
        crop: 'scale',
        responsive: true,
        width: 'auto',
      },
      (err, result) => {
        if (err) {
          res.status(500).send('Server Error');
        }
        return res.json({ photo: result.secure_url });
      },
    );
  },
);

module.exports = router;
