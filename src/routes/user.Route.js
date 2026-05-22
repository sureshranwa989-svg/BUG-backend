const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/AuthMiddleware");
const upload = require("../Middlewares/upload");

const {
  register,
  login,
  updateProfile,
  updatePassword
} = require("../controllers/UserController");

router.post("/register", register);
router.post("/login", login);
router.put("/profile",authMiddleware,upload.single("profileImage"),updateProfile,);
router.put("/update-password", authMiddleware, updatePassword);

module.exports = router;
