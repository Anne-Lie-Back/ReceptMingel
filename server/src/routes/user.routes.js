const express = require('express');
const router = express.Router();

// MIDDLEWARES
const isAuthenticated = require("../middlewares/isAuthenticated");

//HANDLERS
const {
    registerUser,
    getAllUsers,
    getSessionUser,
    getRecipeBook,
    updateUser,
    loginUser,
    logoutUser,
    deleteUser
} = require('../handlers/user.handlers');

//ENDPOINTS

//GET ALL USERS
router.get('/all', isAuthenticated, getAllUsers, (req, res) => {
    res.status(200).json(res.allUsers);
})

//GET ONE USER (TODO)
router.get('/:id',isAuthenticated, (req, res) => {
    res.status(200).json('Hello!');
})

//TODO is this why I have small bug? wrong order of handlers?
//GET SESSION USER
router.get('/', isAuthenticated, getSessionUser, (req, res) => {
    res.status(200).json({ message: "Authenticated", user: res.user});
})

//REGISTER NEW USER
//TODO add ({ message: "Authenticated", user: res.user }) in json response
router.post('/', registerUser,(req, res) => {
    res.status(200).json({ message: "Authenticated", user: res.user});
})

//UPDATE USER OR RECIPEBOOK
router.put('/:id', updateUser, (req, res) => {
    res.status(200).json(res.updateUser);
})

//GET Recipebook
router.get('/recipebook/:id', getRecipeBook, (req, res) => {
    res.status(200).json(res.recipeBook)
})

//PATCH recipeBook TODO rmove?
/* router.patch('recipebook/:id', getSessionUser, isAuthenticated, updateUser, (req, res) => {
    res.status(200).json(res.updateUser);
}) */

//DELETE USER
router.delete('/:id', isAuthenticated, getSessionUser, deleteUser,(req, res) => {
    res.status(200).json(res.deletedUser)
})

//LOGIN USER
router.post('/session/login', loginUser, (req, res) => {
    res.status(200).json({ message: "Authenticated", user: res.user });
})

//LOGOUT USER
//TODO isAuthenticated
router.delete('/session/logout', isAuthenticated, logoutUser, (req, res) => {
    res.status(200).json({message: "session deleted"})
})

module.exports = router;