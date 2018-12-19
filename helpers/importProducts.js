const mongoose = require('mongoose')
const Product = require('../models/product')
const ProductFS = require('../models/productFilesystem')

mongoose.connect('mongodb://127.0.0.1:27017/workshopdatabase', {useNewUrlParser: true})

// on success
mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to db')

    try {
        ProductFS.all((err, products) =>{
            if (err) {
                console.log(err);
            } else {
                Product.insertMany(products, function(err) { if (err) console.log(err) });
                console.log('Import successfully')
            }
        })
    } catch (err) {
        mongoose.disconnect();
    }
})

// on error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err)
})
