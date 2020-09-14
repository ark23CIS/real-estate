const express = require("express");
const { check } = require("express-validator");
const { User } = require("../models");
const { postUserCtrl, confirmUserCtrl } = require("../controllers");
const router = express.Router();

router.post(
  "/",
  [
    check("firstName", "First Name is required").not().isEmpty(),
    check("lastName", "Last Name is required").not().isEmpty(),
    check("email", "Email is not correct").isEmail(),
    check(
      "password",
      "Password length is not valid it should be 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  postUserCtrl
);

router.get("/confirm", confirmUserCtrl);

module.exports = router;
