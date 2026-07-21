const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../Middalwares/authMiddalware");
const {
  cartAdd,
  getCart,
  cartRemove,
  increaseCount,
  decreaseCount,
  removecartItem,
} = require("../Controller/cartController");

router.get("/", isLoggedIn, getCart);
router.post("/add/:id", isLoggedIn, cartAdd);
router.patch("/reduce/:id", isLoggedIn, decreaseCount);
router.patch("/increase/:id", isLoggedIn, increaseCount);
router.delete("/remove/:id", isLoggedIn, removecartItem);

module.exports = router;
