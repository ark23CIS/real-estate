const express = require("express");
const { check } = require("express-validator");
const { usersController } = require("../controllers");
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
  usersController
);

module.exports = router;
