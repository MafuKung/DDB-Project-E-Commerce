const addToCartModel = require("../../models/cartProduct");

const clearCart = async (req, res) => {
    try {
        const currentUserId = req.userId;

        const deleteCartItems = await addToCartModel.deleteMany({ userId: currentUserId });

        const count = await addToCartModel.countDocuments({ userId: currentUserId });
        
        res.json({
            message: "Cart cleared successfully",
            success: true,
            data: deleteCartItems,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Failed to clear cart",
            success: false,
        });
    }
};

module.exports = clearCart;