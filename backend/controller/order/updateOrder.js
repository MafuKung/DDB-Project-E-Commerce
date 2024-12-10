const orderModel = require("../../models/orderProductModel");

const updateOrder = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({ message: "Order ID and status are required", success: false });
        }

        const updatedOrder = await orderModel.findOneAndUpdate(
            { orderId },
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            console.error("Order not found for ID:", orderId);
            return res.status(404).json({ message: "Order not found", success: false });
        }

        res.status(200).json({ message: "Order status updated", success: true, data: updatedOrder });
    } catch (error) {
        console.error("Error updating order:", error.message);
        res.status(500).json({ message: error.message || "Failed to update order", success: false });
    }
};

module.exports = updateOrder;
