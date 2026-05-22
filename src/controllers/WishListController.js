const WishList = require('../model/WishList');

// Add to WishList

exports.addWishList = async (req, res) =>{
    try{
        // Get logged-in user from auth middleware
        const userId = req.user._id;

        // Get data from request body
        const { productId } = req.body;

        // Check if the product is already in the wishlist
         const existingWishListItem = await WishList.findOne({
            user: userId,
            product: productId,
        });
        if (existingWishListItem) {
            return res.status(400).json({
                success: false,
                message: "Product is already in the wishlist",
            });
        }
        // create a new wishlist item

        const wishList = await WishList.create({
            user: userId,
            product: productId,
        });

        res.status(201).json({
            success: true,
            message: "Product added to wishlist",
            data: wishList
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding product to wishlist",
            error: error.message
        });
    }
};

// Get WishList
exports.getWhishList = async (req, res) =>{
    try {
        const wishList = await WishList.find({
            user: req.user._id,
        }).populate('product')
        res.status(200).json({
            success: true,
            wishList,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching wishlist",
            error: error.message
        });
    }
};
    
// Remove WishList

exports.removeWishList = async (req, res) =>{
    try{
        const wishListItem = await WishList.findById(req.params.id);
        if (!wishListItem) {
            return res.status(404).json({
                success: false,
                message: "Wishlist item not found",
            });
        }
        if (wishListItem.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access",
            });
        }
        await wishListItem.deleteOne();
        res.status(200).json({
            success: true,
            message: "Wishlist item removed successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error removing wishlist item",
            error: error.message
        });     
    }
}
