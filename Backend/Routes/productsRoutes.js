const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../Middalwares/authMiddalware");
const {
  homeController,
  cartAdd,
  getCart,
  cartRemove,
  increaseCount,
  decreaseCount,
  removecartItem,
} = require("../Controller/productController");

router.get("/", isLoggedIn, homeController);
router.get("/cart", isLoggedIn, getCart);
router.post("/add/:id", isLoggedIn, cartAdd);
router.patch("/reduce/:id", isLoggedIn, decreaseCount);
router.patch("/increase/:id", isLoggedIn, increaseCount);
router.delete("/remove/:id", isLoggedIn, removecartItem);

module.exports = router;
