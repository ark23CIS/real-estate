const express = require("express");
const { check, validationResult } = require("express-validator");
const { signUpController } = require("../controllers");
const router = express.Router();

router.post(
  "/",
  [
    check("password", "Pass a correct email").exists(),
    check("email", "Pass a correct email").isEmail(),
  ],
  (req, res) => {
    console.log(req);
  }
);

module.exports = router;
