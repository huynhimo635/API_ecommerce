const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, getCount, getFeaturedCount } = require('../controllers/products');


//get all products 
router.get(`/`, getAllProducts);
//get a product by id
router.get(`/:id`, getProductById)
//add product
router.post(`/`, addProduct)
//update product
router.put('/:id', updateProduct)
//delete product
router.delete('/:id', deleteProduct)
//get count of product
router.get('/get/count', getCount);
//get count of featured product
router.get('/get/featured/:count', getFeaturedCount)

module.exports = router;
