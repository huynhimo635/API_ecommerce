const { Product } = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const mongoose = require('mongoose');


exports.getAllProducts = async (req, res) => {
    //localhost:3000/api/products?categories=id
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }
    try {
        const productList = await Product.find(filter).populate('category');
        res.send(productList);
    } catch (err) {
        res.status(500).json({ success: false }, { message: err })
    }

}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        res.send(product);
    } catch (err) {
        return res.status(500).json({ success: false, error: err })
    }
}

exports.addProduct = async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send('Invalid Category');
    }
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })
    try {
        product = await product.save();
        return res.send(product);
    } catch (err) {
        return res.status(500).json({ success: false, error: err })
    }
}

exports.updateProduct = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product Id')
    }
    try {
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(400).send('Invalid Category');
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
            },
            { new: true }
        )

        res.send(product)
    } catch {
        return res.status(500).json({ success: false, error: err })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.status(200).json({ success: true, message: 'The product is deleted' })
    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

exports.getCount = async (req, res) => {
    try {
        const productCount = await Product.countDocuments((count) => count)
        res.send({
            productCount: productCount
        })
    } catch (err) {
        return res.status(500).json({ success: false, error: err })
    }
}

exports.getFeaturedCount = async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    try {
        const products = await Product.find({ isFeatured: true }).limit(+count);
        res.send({
            products: products
        })
    } catch (err) {
        return res.status(500).json({ success: false, error: err })
    }
}

