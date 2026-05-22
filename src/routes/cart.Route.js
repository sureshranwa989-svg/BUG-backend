const express = require("express");

const router = express.Router();
const authMiddleware = require('../Middlewares/AuthMiddleware');

const {
  addToCart,
  getCart,
 removeCartItems,
 updateCartItem,
} = require("../controllers/CartController");


// Add to cart
router.post("/add", authMiddleware, addToCart);


// Get cart
router.get("/", authMiddleware, getCart);
router.get("/:userId", authMiddleware, getCart);

// Update quantity/options
router.put("/:id", authMiddleware, updateCartItem);

// Remove item
router.delete("/:id", authMiddleware, removeCartItems);

module.exports = router;
