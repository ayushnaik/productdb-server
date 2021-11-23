var express = require('express');
var router = express.Router();
var Product = require('../controllers/product');

router.post('/product', Product.create);
router.get('/product', Product.findAll);
router.get('/product/:_id', Product.findOne);
router.get('/product/cat/:category', Product.findSome);
router.put('/product/:_id', Product.update);
router.delete('/product/:_id', Product.delete);
module.exports = router;