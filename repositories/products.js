const Product = require('../models/product')
const OrdersRepository = require('../repositories/orders')

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

exports.order = function (id, user, callback) {
    try {
        Product.findOneAndUpdate({_id: id}, {$inc: {orders_count: 1}}, {new: true}, (err, product) => {
            if (err) {
                return callback(err);
            }
            OrdersRepository.addOrder(product, user).then((result) => console.log(result))
            callback(null, product)
        })
    } catch (err) {
        return callback(err);
    }
}
