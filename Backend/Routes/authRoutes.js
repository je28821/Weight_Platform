const express = require("express");
const {
  registerController,
  loginController,
  googleController,
} = require("../Controller/authController");
const { validate } = require("../Middalwares/validator");
const registerSchema = require("../Validators/registerValidator");
const loginSchema = require("../Validators/loginValidator");
const router = express.Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);
router.post("/google", googleController);

module.exports = router;
