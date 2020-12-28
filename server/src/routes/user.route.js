const { json } = require('express');
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

//REGISTER NEW USER
//TODO add ({ message: "Authenticated", user: res.user }) in json response
router.post('/', (req, res) => {
    res.status(201).json(res.user)
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

//LOGOUT USER