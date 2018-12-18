const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    id: Number,
    name: String,
    author: String,
    description: String,
    USD_price: Number,
    EUR_price: Number,
    file_link: String,
    creation_date: Date,
    orders_count: Number
})

var Product = mongoose.model('Product', schema);

module.exports = Product;