const express = require("express");
const router = express.Router();

router.get("/product", async (req, res) => {
  await res.send("Hello World!");
});

router.get("/product/:id", async (req, res) => {
    await res.send("Hello 1 Product!")
});

router.post("/product", async (req, res) => {
  await res.send("Hello post");
});

router.put("/product/:id", async (req, res) => {
  await res.send("Hello put");
});

router.delete("/product/:id", async (req, res) => {
  await res.json({
    name: "kittituch",
    age: 20,
    id: 1,
  });
});

module.exports = router;
