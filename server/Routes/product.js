const express = require("express");
const router = express.Router();
const {
  read,
  list,
  create,
  update,
  deleteData,
} = require("../Controllers/productController");
// middleware
const { auth } = require("../Middleware/authMiddleware");
const { upload } = require("../Middleware/uploadMiddleware");

router.get("/product", list);
router.get("/product/:id", read);
router.post("/product", auth, upload, create);
router.put("/product/:id", auth, update);
router.delete("/product/:id", auth, deleteData);

module.exports = router;
