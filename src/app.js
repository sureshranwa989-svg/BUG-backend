const express = require('express');
const userRoute = require('./routes/user.Route');
const productRoute = require('./routes/product.Route');
const cartRoute = require('./routes/cart.Route')
const wishListRoute = require('./routes/wishList.Route');
const orderRoute = require('./routes/Order.Route');
const testRoute = require('./routes/test.Route')
const paymentRoute = require('./routes/Payment.Route')
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/wishlist', wishListRoute);
app.use('/api/orders', orderRoute);
app.use('/api/users', userRoute);
app.use("/uploads", express.static("uploads"));
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute)
app.use('/api/test', testRoute);
app.use('/api/payment', paymentRoute);
module.exports = app