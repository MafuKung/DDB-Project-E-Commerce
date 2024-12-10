const orderModel = require("../../models/orderProductModel"); // Assuming you have an order model

const saveOrderController = async (req, res) => {
    try {
        
        const { productDetails, userId, email, paymentDetails, totalAmount } = req.body;

        // Save order to database (adjust as per your model)
        const formattedProductDetails = productDetails.map((item) => ({
            name: item.price_data.product_data.name,
            image: item.price_data.product_data.images,
            price: item.price_data.unit_amount / 100, // Convert to actual price
            quantity: item.quantity,
            productId: item.price_data.product_data.metadata.productId,
        }));

        // Add placeholder values for shipping options
        const shippingOptions = [
            {
                shipping_amount: 60, // Adjust if you have real shipping data
            },
        ];

        // Save order to the database
        const newOrder = new orderModel({
            productDetails: formattedProductDetails,
            userId,
            email,
            paymentDetails: {
                ...paymentDetails,
                payment_method_type: paymentDetails.payment_method_type || ["N/A"], // Add fallback
            },
            shipping_options: shippingOptions,
            totalAmount,
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: "Order saved successfully",
            error: false,
            success: true,
            data: savedOrder,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = saveOrderController;