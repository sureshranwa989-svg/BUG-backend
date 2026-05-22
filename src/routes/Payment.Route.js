const express = require('express');
const authMiddleware = require('../Middlewares/AuthMiddleware');

const router = express.Router();

const { createOrder } = require("../controllers/PaymentController");

router.post ('/create-order', authMiddleware, createOrder)

module.exports = router;