const mongoose = require('mongoose')
const Product = require('../models/product')
const ProductFS = require('../models/productFilesystem')

mongoose.connect('mongodb://localhost:27017/workshopDatabase')

// on success
mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to db')

    try {
        ProductFS.all((err, products) =>{
            if (err) {
                console.log(err);
            } else {
                console.log(Product.length);
                // Product.find((err, res) => console.log(res));
                //Product.insertMany(products);
            }
        })
    } catch (err) {
        console.log(err);
    }
})

// on error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err)
})

mongoose.disconnect();
