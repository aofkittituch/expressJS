const express = require("express");
const router = express.Router();

router.get("/auth", async (req, res) => {
  await res.send("Hello auth");
});

module.exports = router;
