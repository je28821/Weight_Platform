const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../Middalwares/authMiddalware");
const { addOrder, getOrder } = require("../Controller/orderController");

router.get("/", isLoggedIn, getOrder);
router.post("/", isLoggedIn, addOrder);

module.exports = router;
