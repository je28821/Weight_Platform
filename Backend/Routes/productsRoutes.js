const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../Middalwares/authMiddalware");
const {
  homeController,
  getProduct,
  deleteProduct,
} = require("../Controller/productController");

router.get("/", isLoggedIn, homeController);
router.get("/:id", isLoggedIn, getProduct);

router.delete("/:id", isLoggedIn, deleteProduct);

module.exports = router;
