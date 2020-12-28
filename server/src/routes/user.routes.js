const express = require('express');
const router = express.Router();

// MIDDLEWARES

//HANDLERS
const {
    registerUser,
    getAllUsers,
    getSessionUser,
    updateUser,
    loginUser,
    logoutUser,
    deleteUser
} = require('../handlers/user.handlers');

//ENDPOINTS

//GET ALL USERS
//TODO getSessionUser & isAuthenticated
router.get('/all', getAllUsers, (req, res) => {
    res.status(200).json(res.allUsers);
})

//GET ONE USER
router.get('/:id', (req, res) => {
    res.status(200).json('Hello!');
})

//GET SESSION USER
//TODO isAuthenticated
router.get('/', getSessionUser, (req, res) => {
    res.status(200).json({ message: "Authenticated", user: res.user});
})

//REGISTER NEW USER
//TODO add ({ message: "Authenticated", user: res.user }) in json response
router.post('/', registerUser,(req, res) => {
    res.status(200).json({ message: "Authenticated", user: res.user});
})

//UPDATE USER
//TODO isAuthenticated
router.put('/:id', getSessionUser, updateUser, (req, res) => {
    res.status(200).json(res.updateUser);
})

//DELETE USER
//TODO: isAuthenticated,
router.delete('/:id', getSessionUser, deleteUser,(req, res) => {
    res.status(200).json(res.deletedUser)
})

//LOGIN USER
router.post('/session/login', loginUser, (req, res) => {
    res.status(200).json({ message: "Authenticated", user: res.user });
})

//LOGOUT USER
//TODO isAuthenticated
router.delete('/session/logout', logoutUser, (req, res) => {
    res.status(200).json({message: "session deleted"})
})

module.exports = router;