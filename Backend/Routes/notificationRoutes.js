const express = require("express");

const router = express.Router();

const { isLoggedIn } = require("../Middalwares/authMiddalware");
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../Controller/notificationController");

router.get("/", isLoggedIn, getNotifications);
router.patch("/:id/read", isLoggedIn, markAsRead);
router.patch("/read-all", isLoggedIn, markAllAsRead);
router.delete("/:id", isLoggedIn, deleteNotification);

module.exports = router;
