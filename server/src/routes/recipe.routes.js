const express = require('express');
const router = express.Router();


//HANDLERS
const {
    getAllRecipes, 
    getRecipeByID,
    getRecipesByIsShared,
    getRecipesByAuthor,
    createRecipe,
    updateRecipe,
    deleteRecipe
} = require('../handlers/recipe.handlers');

// MIDDLEWARES
const isAuthenticated = require("../middlewares/isAuthenticated");

//ENDPOINTS

//GET ALL RECIPES
router.get('/', isAuthenticated, getAllRecipes, (req, res) => {
    res.status(200).json(res.allRecipes)
});

//GET RECIPE BY ID
//TODO maybe remove so you can chare recipe to others
router.get('/:id', isAuthenticated, getRecipeByID, (req, res) => {
    res.status(200).json(res.recipe)
});

//GET RECIPE BY isShared
router.get('/public', isAuthenticated, getRecipesByIsShared, (req, res) => {
    res.status(200).json(res.recipesByIsShared)
});

//GET RECIPE BY AUTHOR
router.get('/author/:author', isAuthenticated, getRecipesByAuthor, (req, res) => {
    res.status(200).json(res.recipesByAuthor)
});


//CREATE RECIPE
router.post('/', isAuthenticated, createRecipe, (req, res) => {
    res.status(200).json(res.createdRecipe);
});

//UPDATE RECIPE
router.put('/:id', isAuthenticated, updateRecipe, (req, res) => {
    res.status(200).json(res.updatedRecipe);
});

//PATCH RECIPE
router.patch('/:id', isAuthenticated, updateRecipe, (req, res) => {
    res.status(200).json(res.patchedRecipe);
});

//DELETE RECIPE
router.delete('/:id', isAuthenticated, deleteRecipe, (req, res) => {
    res.status(200).json(res.deletedRecipe);
});

module.exports = router