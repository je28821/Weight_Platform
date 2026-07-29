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
  deleteAppointment,
} = require("../Controller/appointmentController");
const { isLoggedIn, isAdmin } = require("../Middalwares/authMiddalware");

router.get("/", isLoggedIn, getAppointmnet);
router.post("/", isLoggedIn, cheack(appointmentSchema), addAppointmnet);
router.delete("/:id", isLoggedIn, deleteAppointment);

router.get("/admin", isLoggedIn, isAdmin, adminAppointmnet);
router.post("/confirm", isLoggedIn, isAdmin, handleConfirm);
router.post("/ignore", isLoggedIn, isAdmin, handleIgnore);

module.exports = router;
