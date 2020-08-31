const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("signin");
  console.log("EEEEEEEE");
});

module.exports = router;
