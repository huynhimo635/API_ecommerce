const express = require("express");
const { getAllUser, getUserById, addUser, login, register, deleteUser, getCountUser } = require("../controllers/users");
const router = express.Router();

//get user
router.get(`/`, getAllUser);
//get user by id
router.get("/:id", getUserById);
//add user
router.post("/", addUser);
//login
router.post('/login', login)
//register
router.post("/register", register);

router.get(`/get/count`, getCountUser)

router.delete('/:id', deleteUser);

module.exports = router;
