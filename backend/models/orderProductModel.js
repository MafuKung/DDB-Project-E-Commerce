const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    orderId: { // Add this field for unique order identification
        type: String,
        required: true,
    },
    productDetails : {
        type : Array,
        default : []
    },
    email : {
        type : String,
        default : ""
    },
    userId : {
        type : String,
        default : ""
    },
    paymentDetails : {
        paymentId : {
            type : String,
            default : ""
        },
        payment_method_type : [],
        payment_status : {
            type : String,
            default : ""
        }
    },
    shipping_options : [],
    totalAmount : {
        type : Number,
        default : 0
    },
    status: { // Add this field to track order status
        type: String,
        default: "pending", // Default to "pending"
        enum: ["pending", "paid", "canceled"], // Allow only specific statuses
    },
},{
    timestamps : true
})

const orderModel = mongoose.model('order',orderSchema)

module.exports = orderModel