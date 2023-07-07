const express = require("express");
const router = express.Router();
const {
  read,
  list,
  create,
  update,
  deleteData,
} = require("../controllers/productController");
// middleware
const { auth } = require("../Middleware/authMiddleware");

router.get("/product", auth, list);
router.get("/product/:id", auth, read);
router.post("/product", auth, create);
router.put("/product/:id", auth, update);
router.delete("/product/:id", auth, deleteData);

module.exports = router;
