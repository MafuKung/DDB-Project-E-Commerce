const orderModel = require("../../models/orderProductModel")
const userModel = require("../../models/userModel")

const allOrderController = async(request,response)=>{
    try {
        const userId = request.userId;

        // Verify admin user
        const user = await userModel.findById(userId);
        console.log("User details:", user);

        if (user.role !== 'ADMIN') {
            return response.status(403).json({ message: "Access denied" });
        }

        // Fetch all orders, ensuring no unintended filters
        const AllOrder = await orderModel.find({}).sort({ createdAt: -1 });
        console.log("Orders fetched from DB:", AllOrder);

        return response.status(200).json({
            data: AllOrder,
            success: true,
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
        });
    }

}

module.exports = allOrderController