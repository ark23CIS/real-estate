const express = require("express");
const { check } = require("express-validator");
const { createEstate } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const router = express.Router();

router.post(
  "/",
  [
    authMiddleware,
    check("title", "Title is required").exists(),
    check("text", "Text is required").exists(),
    check("contactNumber", "Contact number is required").exists(),
    check("price", "Price is required").exists(),
    check("footage", "Footage is required").exists(),
    check("region", "Region is required").exists(),
    check("price", "Price should be a number").isNumeric(),
    check("footage", "Footage should be a number").isNumeric(),
  ],
  createEstate
);

module.exports = router;
