const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter User ID'],
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
