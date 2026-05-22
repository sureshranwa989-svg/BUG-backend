const express = require('express');

const router = express.Router();
const authMiddleware = require('../Middlewares/AuthMiddleware');

const {
    addWishList,
    getWhishList,
    removeWishList, 
} = require('../controllers/WishListController');

router.post('/add', authMiddleware, addWishList);

router.get('/', authMiddleware, getWhishList);
router.get('/:userId', authMiddleware, getWhishList);

router.delete('/:id', authMiddleware, removeWishList);

module.exports = router;    
