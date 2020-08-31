const express = require("express");
const { check } = require("express-validator");
const { signUpController, validationResult } = require("../controllers");
const router = express.Router();

router.post(
  "/",
  [
    check("password", "Pass a correct email").exists(),
    check("email", "Pass a correct email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

module.exports = router;
