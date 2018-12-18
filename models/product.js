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