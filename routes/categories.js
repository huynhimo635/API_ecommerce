const express = require('express');
const { getAllCategory, getCategoryById, addCategory, updateCategory, deleteCategory } = require('../controllers/categories.js');
const router = express.Router();

//get all category
router.get('/', getAllCategory)
//get a category by id
router.get('/:id', getCategoryById)
//add category
router.post('/', addCategory);
//update category
router.put('/:id', updateCategory);
//delete category
router.delete('/:id', deleteCategory)

module.exports =router;