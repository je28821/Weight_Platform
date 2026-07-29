const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../Middalwares/authMiddalware");
const {
  getDashboardData,
  addProduct,
} = require("../Controller/adminController");
const { storage } = require("../Config/cloudinary");
const multer = require("multer");
const upload = multer({ storage });
const { validate } = require("../Middalwares/validator");
const { productSchema } = require("../Validators/productValidator");
const parseDescription = require("../Middalwares/prdouctDecrypter");

router.get("/", isLoggedIn, isAdmin, getDashboardData);
router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  parseDescription,
  validate(productSchema),
  addProduct,
);
module.exports = router;
