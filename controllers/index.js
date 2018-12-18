var express = require('express')
  , router = express.Router()
  , Product = require('../models/product')

router.get('/', (req, res) => {
    Product.all((err, products) =>
        res.render('pages/index.ejs', {products: products})
    )
})

module.exports = router