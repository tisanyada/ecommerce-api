const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: Boolean,
        default: false
    },
    deliveryStatus: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('orders', orderSchema);