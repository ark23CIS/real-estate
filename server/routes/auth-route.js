const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { authMiddleware } = require('../middlewares');
const { authGetController, authPostController } = require('../controllers');

router.get('/', authMiddleware, authGetController);

router.post(
  '/',
  [
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is not correct').isEmail(),
  ],
  authPostController,
);

module.exports = router;
