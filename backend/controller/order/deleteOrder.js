const orderModel = require("../../models/orderProductModel");

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required", success: false });
        }

        const deletedOrder = await orderModel.findOneAndDelete({ orderId, status: 'pending' });

        if (!deletedOrder) {
            return res.status(404).json({ message: "Pending order not found", success: false });
        }

        res.status(200).json({ message: "Pending order deleted", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to delete order", success: false });
    }
};

module.exports = deleteOrder;
