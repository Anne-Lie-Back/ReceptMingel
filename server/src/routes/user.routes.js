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
router.get('/all', getSessionUser, getAllUsers, (req, res) => {
    res.status(200).json(res.allUsers);
})

//GET ONE USER
router.get('/:id',isAuthenticated, (req, res) => {
    res.status(200).json('Hello!');
})

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
router.patch('/:id', getSessionUser, isAuthenticated, updateUser, (req, res) => {
    res.status(200).json(res.updateUser);
})

//GET Recipebook
router.get('/recipebook/:id', getSessionUser, isAuthenticated, getRecipeBook, (req, res) => {
    res.status(200).json(res.recipeBook)
})

//PATCH recipeBook TODO rmove?
/* router.patch('recipebook/:id', getSessionUser, isAuthenticated, updateUser, (req, res) => {
    res.status(200).json(res.updateUser);
}) */

//DELETE USER
router.delete('/:id', getSessionUser, isAuthenticated, deleteUser,(req, res) => {
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