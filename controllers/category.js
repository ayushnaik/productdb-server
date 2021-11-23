const Category = require('../models/category');

exports.create = async(req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Category can not be empty"
        });
    }

    const category = new Category({
        categoryName: req.body.categoryName,
        products: req.body.products
    });

    category.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Category."
            });
        });
};

exports.findAll = (req, res) => {
    Category.find()
        .then(category => {
            res.send(category);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving category."
            });
        });
};

exports.findOne = (req, res) => {
    Category.findById(req.params._id)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params._id
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params._id
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Category can not be empty"
        });
    }

    Category.findByIdAndUpdate(req.params._id, {
            categoryName: req.body.categoryName
        }, { new: true })
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params._id
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params._id
            });
        });
};

exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params._id)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params._id
                });
            }
            res.send({ message: "Category deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params._id
            });
        });
};