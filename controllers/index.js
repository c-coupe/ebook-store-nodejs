var express = require('express')
  , router = express.Router()
  , Product = require('../models/product')
  , ProductsRepository = require('../repositories/products')
  , OrdersRepository = require('../repositories/orders')
  , passport = require('passport')
  , restify = require('express-restify-mongoose')

/* ===== RESTIFY ===== */
restify.serve(router, Product)

router.get('/', (req, res) => {
    ProductsRepository.all((err, products) =>
        res.render('pages/index.ejs', {products: products, messages: req.flash('error'), user: req.user})
    )
})

router.get('/orders', (req, res) => {
    if(! req.user) {
        return res.status(302).send('Must login first...');
    }
    OrdersRepository.all(req.user)
        .then((orders) => {
            res.render('pages/orders.ejs', {orders: orders, user: req.user})
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Something broke!');
        })
})

router.post('/order', (req, res) => {
    if(! req.user) {
        return res.status(401).send('Must login first...');
    }
    try {
        ProductsRepository.order(req.body.id, req.user, (err, product) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(product));
        })
    } catch (err) {
        console.log(err);
        res.status(400).send('Something broke!');
    }
})

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/', failureFlash: true })
);

module.exports = router