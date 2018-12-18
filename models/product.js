let fs = require('fs');

const productsFile = __dirname + '/../data/products.json';

exports.all = function (callback) {
    fs.readFile(productsFile, 'utf-8', (err, content) => {
        if (err) {
            return callback(err);
        }

        try {
            callback(null, JSON.parse(content));
        } catch (err) {
            return callback(err);
        }
    });
}

exports.order = function (id, callback) {
    this.all(function (err, products) {
        if (err) {
            return console.log(err);
        }

        orderProduct(null, products, id, function (err, product) {
            if (err) {
                return console.log(err);
            }
            callback(null , product)
        });
    })
}

function orderProduct(err, products, id, callback) {
    if (err) {
        return callback(err);
    }

    var found = products.find(product => product.id === parseInt(id))

    if ('undefined' == typeof found) {
        return callback('Product not found.');
    }

    found.orders_count++;
    fs.writeFile(productsFile, JSON.stringify(products, null, 2), (err) => {
        if (err) {
            return callback(err);
        }
    });

    callback(null, found);
}
