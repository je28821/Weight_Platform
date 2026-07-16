const express = require("express");
const {
  registerController,
  loginController,
  googleController,
  logoutController,
} = require("../Controller/authController");
const { validate } = require("../Middalwares/validator");
const registerSchema = require("../Validators/registerValidator");
const loginSchema = require("../Validators/loginValidator");
const { isLoggedIn } = require("../Middalwares/authMiddalware");
const router = express.Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);
router.post("/google", googleController);
router.delete("/logout", isLoggedIn, logoutController);

module.exports = router;
