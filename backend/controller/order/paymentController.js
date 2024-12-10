const stripe = require('../../config/stripe');
const orderModel = require('../../models/orderProductModel');
const userModel = require('../../models/userModel');

const paymentController = async (request, response) => {
    try {
        const { cartItems } = request.body;

        // Retrieve user details
        const user = await userModel.findOne({ _id: request.userId });

        // Create line items for the order
        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: 'THB',
                product_data: {
                    name: item.productId.productName,
                    images: item.productId.productImage,
                },
                unit_amount: item.productId.sellingPrice * 100,
            },
            quantity: item.quantity,
        }));

        // Generate orderId and save the pending order
        const orderId = `order_${Date.now()}_${request.userId}`;
        const newOrder = new orderModel({
            orderId,
            userId: request.userId,
            email: user.email,
            productDetails: lineItems,
            paymentDetails: {},
            totalAmount: (lineItems.reduce((sum, item) => sum + item.price_data.unit_amount * item.quantity, 0) / 100 )+60,
            shipping_options: [
                {
                    shipping_rate: 60,
                },
            ],
            status: 'pending',
        });

        await newOrder.save();

        // Create payment session
        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1QU1ouAcMjK6Y2MNbNBYGekw',
                },
            ],
            customer_email: user.email,
            metadata: {
                orderId, // Save lightweight identifier
            },
            line_items: lineItems,
            success_url: `${process.env.FRONTEND_URL}/success?orderId=${orderId}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel?orderId=${orderId}`,
        };

        const session = await stripe.checkout.sessions.create(params);

        response.status(303).json(session)
    } catch (error) {
        response.status(400).json({
            message: error?.message || "Failed to create payment session",
            error: true,
            success: false,
        });
    }
};

module.exports = paymentController;


