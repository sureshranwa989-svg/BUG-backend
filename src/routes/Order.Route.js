const express = require("express");
const router = express.Router();
const authMiddleware = require('../Middlewares/AuthMiddleware');

const {
  placeOrder,
  getUserOrders,
} = require("../controllers/OrderController");

// Place order
router.post("/place", authMiddleware, placeOrder);

// Get user orders
router.get("/", authMiddleware, getUserOrders);
router.get("/:userId", authMiddleware, getUserOrders);

module.exports = router;
