const express = require("express");
const router = express.Router();
const { cheack } = require("../Middalwares/validator");
const {
  appointmentSchema,
} = require("../../Frontend/src/Validator/appointment");
const {
  addAppointmnet,
  getAppointmnet,
  adminAppointmnet,
  handleConfirm,
  handleIgnore,
} = require("../Controller/appointmentController");
const { isLoggedIn } = require("../Middalwares/authMiddalware");

router.get("/", isLoggedIn, getAppointmnet);
router.get("/admin", isLoggedIn, adminAppointmnet);

router.post("/", isLoggedIn, cheack(appointmentSchema), addAppointmnet);
router.post("/confirm", isLoggedIn, handleConfirm);
router.post("/ignore", isLoggedIn, handleIgnore);

module.exports = router;
