const Order = require('../model/Order');
const Cart = require('../model/Cart');

//place Order
exports.placeOrder = async (req, res) =>{
    try {
        // Get logged-in user from auth middleware
        const userId = req.user._id;

        // Get data from request body
        const { address, phone, paymentMethod } = req.body;

        // get cart items
        const cartItems = await Cart.find({user: userId, }).populate('product');
        
        if(cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        //prepare products array
          const products = cartItems.map((item) => ({
             product: item.product._id,
             quantity: item.quantity,
             size: item.size,
             color: item.color,

    }));

        // calculate total price
        let totalPrice = 0;

        cartItems.forEach((item)=>{
            const price = item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price;
            totalPrice += price * item.quantity;
        });

        // create order
        const order = await Order.create({
            user: userId,
            products,
            totalPrice,
            address,
            phone,
            paymentMethod,
        });

        // clear cart after order
        await Cart.deleteMany({ user: userId });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error placing order",
            error: error.message,
        });
    }
};


// Get User Orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id,}).populate('products.product').sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching orders",
            error: error.message,
        })
    }
}
