const Product = require('../models/product');
const Category = require('../models/category');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Product can not be empty"
        });
    }

    const product = new Product();
    product.prodName = req.body.prodName;
    product.prodPrice = req.body.prodPrice;
    product.category = req.body.category;
    product.description = req.body.description;
    product.save()
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params._id
                });
            }
            res.send(product);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product."
            });
        });
};

exports.findAll = (req, res) => {
    Product.find()
        .then(product => {
            res.send(product);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving product."
            });
        });
};

exports.findOne = (req, res) => {
    Product.findById(req.params._id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params._id
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params._id
            });
        });
};

exports.findSome = (req, res) => {
    Product.find({
        category: req.params.category
    }, function(err, store) {
        if (err)
            return next(err);



        res.json(store);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Product can not be empty"
        });
    }

    Product.findByIdAndUpdate(req.params._id, {
            prodName: req.body.prodName,
            prodPrice: req.body.prodPrice,
            category: req.body.category
        }, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params._id
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params._id
            });
        });
};

exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params._id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params._id
                });
            }
            res.send({ message: "Product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params._id
            });
        });
};