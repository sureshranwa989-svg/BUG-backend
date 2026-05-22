const razorpay = require('../config/razorpay');

// Create Razorpay Order
exports.createOrder = async (req, res) => {
    try {

        // get amount from request body
        const { amount } = req.body;

        // validation
        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid amount is required"
            });
        }

        const options = {
            amount: amount * 100, // amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order,
            key: process.env.RAZORPAY_KEY_ID,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating order",
            error: error.message,
        });
    }
};
