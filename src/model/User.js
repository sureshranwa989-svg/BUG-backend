const mongoose = require('mongoose');

const userSchama = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    profileImage: {
        type: String
    }

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchama);

module.exports = User;