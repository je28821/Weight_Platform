const express = require("express");
const router = express.Router();
const { cheack } = require("../Middalwares/validator");
const {
  appointmentSchema,
} = require("../../Frontend/src/Validator/appointment");
const { addAppointmnet } = require("../Controller/appointmentController");
const { isLoggedIn } = require("../Middalwares/authMiddalware");

router.post("/", isLoggedIn, cheack(appointmentSchema), addAppointmnet);

module.exports = router;
