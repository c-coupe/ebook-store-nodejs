var express = require('express')
  , router = express.Router()
  , Product = require('../models/product')


router.get('/', (req, res) => {
    Product.all((err, products) =>
        res.render('pages/index.ejs', {products: products})
    )
})

router.post('/order', (req, res) => {
    try {
        Product.order(req.body.id, (err, product) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(product));
        })
    } catch (err) {
        console.log(err);
        res.status(400).send('Something broke!');
    }
})

module.exports = router