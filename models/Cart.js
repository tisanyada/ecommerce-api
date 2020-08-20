const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    items: [
        {
            product: {
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
            }
        }
    ]
}, {
    timestamps: true
});


module.exports = mongoose.model('carts', cartSchema);