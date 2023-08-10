const { Schema, model } = require('mongoose');

const schema = new Schema({
    products: {
        type: [{
            product: { type: Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, default: 0 }
        }],
        default: []
    }
}, { timestamps: true });

const cartModel = model('carts', schema);

module.exports = cartModel;
