const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../Middalwares/authMiddalware");
const {
  homeController,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../Controller/productController");

router.get("/", isLoggedIn, homeController);
router.get("/:id", isLoggedIn, getProduct);

router.put("/:id", isLoggedIn, isAdmin, updateProduct);
router.delete("/:id", isLoggedIn, isAdmin, deleteProduct);

module.exports = router;
