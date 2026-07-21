const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../Middalwares/authMiddalware");
const { getDashboardData } = require("../Controller/adminController");

router.get("/", isLoggedIn, getDashboardData);

module.exports = router;
