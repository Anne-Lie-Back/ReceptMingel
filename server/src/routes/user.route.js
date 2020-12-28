const express = require('express');
const router = express.Router();

// MIDDLEWARES

//HANDLERS

//ENDPOINTS

//GET ALL USERS
router.get('/all', (req, res) => {
    res.status(200).json(res.allUsers);
})

//GET ONE USER
router.get('/:id', (req, res) => {
    res.status(200).json(res.user);
})

//GET SESSION USER
router.get('/', (req, res) => {
    res.status(200).json({ message: "Authenticated", user: res.user});
})

//REGISTER NEW USER
//TODO add ({ message: "Authenticated", user: res.user }) in json response
router.post('/', (req, res) => {
    res.status(200).json({ message: "Authenticated", user: res.user});
})

//UPDATE USER
router.put('/:id', (req, res) => {
    res.status(200).json(res.updateUser);
})

//DELETE USER
router.delete('/:id', (req, res) => {
    res.status(200).json(res.deletedUser)
})

//LOGIN USER
router.post('/session/login', (req, res) => {
    res.status(200).json({ message: "Authenticated", user: res.user });
})

//LOGOUT USER
router.delete('/session/logout', (req, res) => {
    res.status(200).json({message: "session deleted"})
})