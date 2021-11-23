var mongoose = require('mongoose');

var ProductsSchema = new mongoose.Schema({
    prodName: String,
    prodPrice: Number,
    category: String
});

module.exports = mongoose.model('Products', ProductsSchema);