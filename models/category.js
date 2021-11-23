var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    categoryName: { type: String, unique: true }
});

module.exports = mongoose.model('Category', CategorySchema);