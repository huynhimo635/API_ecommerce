const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

//get all category
router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).send(categoryList);
    } catch (err) {
        res.status(500).json({ success: false })
    }
})

//get a category by id
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).send(category);
    } catch (err) {
        res.status(500).json({ message: 'The category with the given ID was not found', error: err })
    }
})

//add category
router.post('/', async (req, res) => {
    try {
        let category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        })
        category = await category.save();
        res.send(category);
    } catch(err){
        res.status(404).send('The category cannot be created!').json({error: err})
    }
});

//update category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id, {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
            { new: true }
        )
        res.send(category);
    } catch (err) {
        return res.status(400).send('The category cannot be created!').json({error: err})
    }
});


//delete category
router.delete('/:id', async (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then(category => {
            if (category) {
                return res.status(200).json({success: true, message: 'The category is deleted!'})
            } else {
                return res.status(404).json({success: false, message: "category not found!"})
            }
        }).catch (err => {
            return res.status(400).json({success: false, error: err})
        })
})

module.exports =router;