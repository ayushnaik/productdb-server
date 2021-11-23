var express = require('express');
var router = express.Router();
var Category = require('../controllers/category');

router.post('/category', Category.create);
router.get('/category', Category.findAll);
router.get('/category/:_id', Category.findOne);
router.put('/category/:_id', Category.update);
router.delete('/category/:_id', Category.delete);
module.exports = router;