const {User} = require("../models/user");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

//get user
router.get(`/`, async (req, res) => {
    try {
        const userList = await User.find().select("-passwordHash");
        res.send(userList);
    } catch (err) {
        res.status(500).json({success: false, error: err});
    }
});

//get user by id
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).select("-passwordHash");
        res.send(user);
    } catch (err) {
        res.status(500).json({success: false, error: err});
    }
});

//add user
router.post("/", async (req, res) => {
    let user = new User({
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
    });
    try {
        user = await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send("The user cannot be created").json({error: err});
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const secret = process.env.secret;
        
        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                {expiresIn: '1d'}
            )
            res.status(200).send({user: user.email, token: token})
        } else {
            res.status(400).send('Password is wrong!')
        }
    } catch (err) {
        res.status(400).send("The user not found").json({ error: err });
    }
})

//register
router.post("/register", async (req, res) => {
    let user = new User({
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
    });
    try {
        user = await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send("The user cannot be created").json({ error: err });
    }
});


module.exports = router;
