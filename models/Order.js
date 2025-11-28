import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    producy: {
        type: String, required: true, ref: "Product"
    },
    quantuty: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: String, required: true, default: 'Order Placed'
    },
    data: {
        type: Date,
        required: true,

    }
})
const Order = mongoose.models.order || mongoose.model("order", orderSchema)

export default Order
