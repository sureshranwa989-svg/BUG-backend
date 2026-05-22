const Cart = require("../model/Cart");
const Product = require("../model/Product");

// Add Product To Cart
exports.addToCart = async (req, res) => {
  try {

    // Get logged-in user from auth middleware
    const userId = req.user._id;

    // Get data from request body
    const { productId, quantity, size, color } = req.body;

    // Check if product exists
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if product already exists in cart
    let cartItem = await Cart.findOne({
      user: userId,
      product: productId,
      size,
      color,
    });

    // Update quantity if already exists
    if (cartItem) {

      cartItem.quantity += quantity || 1;

      await cartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cartItem,
      });
    }

    // Create new cart item
    cartItem = await Cart.create({
      user: userId,
      product: productId,
      quantity: quantity || 1,
      size,
      color,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      cartItem,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error adding product to cart",
      error: error.message,
    });
  }
};

// Update Cart Item Quantity
exports.updateCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    if (cartItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    cartItem.quantity = Math.max(Number(req.body.quantity) || 1, 1);

    if (req.body.size) cartItem.size = req.body.size;
    if (req.body.color) cartItem.color = req.body.color;

    await cartItem.save();
    await cartItem.populate("product");

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    });
  }
};

// Get Logged-in User Cart
exports.getCart = async (req, res) => {
  try {

    const cart = await Cart.find({
      user: req.user._id,
    }).populate("product");

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

// Remove Cart Item
exports.removeCartItems = async (req, res) => {
  try {

    // Find cart item
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Check ownership
    if (cartItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Delete item
    await cartItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};
