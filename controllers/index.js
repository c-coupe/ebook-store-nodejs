var express = require('express')
  , router = express.Router()
  , ProductsRepository = require('../repositories/products')


router.get('/', (req, res) => {
    ProductsRepository.all((err, products) =>
        res.render('pages/index.ejs', {products: products})
    )
})

router.post('/order', (req, res) => {
    try {
        ProductsRepository.order(req.body.id, (err, product) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(product));
        })
    } catch (err) {
        console.log(err);
        res.status(400).send('Something broke!');
    }
})

module.exports = router