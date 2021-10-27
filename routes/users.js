const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

//get user
router.get(`/`, async (req, res) =>{
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

//add user
router.post('/', async (req, res) => {
    try {
        let user = newUser({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        })
        user = await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send('The user cannot be created').json({error: err});
    }
    
})

module.exports =router;