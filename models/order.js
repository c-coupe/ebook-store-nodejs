const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    creation_date: {type: Date, default:Date.now()},
    EUR_price: Number
})

var Order = mongoose.model('Order', schema);

module.exports = Order;
