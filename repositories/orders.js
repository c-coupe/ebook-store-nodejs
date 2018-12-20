const Order = require('../models/order')

exports.addOrder = async function (product, user) {
    try {
        var newOrder = {product_id: product._id, user_id: user._id, EUR_price: product.EUR_price };
        return await Order.create(newOrder);
    } catch (err) {
        return console.log(err);
    }
}

exports.all = async function (user) {
    return await Order.find({user_id: user._id}).populate('product_id')
}
