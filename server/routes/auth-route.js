const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { authMiddleware } = require("../middlewares");
const { authGetController, authPutController } = require("../controllers");

router.get("/", authMiddleware, authGetController);

router.post(
  "/",
  [
    check("password", "Password is required").exists(),
    check("email", "Email is not correct").isEmail(),
  ],
  authPutController
);

module.exports = router;
