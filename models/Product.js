const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'admins',
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
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('products', productSchema);