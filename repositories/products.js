const mongoose = require('mongoose')
const Product = require('../models/product')

exports.all = function (callback) {
    try {
        Product.find({}, (err, products) =>{
            if (err) {
                return callback(err);
            }
            callback(null, products)
        })
    } catch (err) {
        return callback(err);
    }
}

exports.order = function (id, callback) {
    try {
        Product.findOneAndUpdate({_id: id}, {$inc: {orders_count: 1}}, {new: true}, (err, product) => {
            if (err) {
                return callback(err);
            }
            callback(null, product)
        })
    } catch (err) {
        return callback(err);
    }
}
