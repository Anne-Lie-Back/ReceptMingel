const express = require('express');
const router = express.Router();


//HANDLERS
const {
    getAllRecipes, 
    getRecipeByID,
    getRecipesByIsPublic,
    getRecipesByIsPrivate,
    getRecipesByAuthorId,
    createRecipe,
    updateRecipe,
    deleteRecipe
} = require('../handlers/recipe.handlers');

// MIDDLEWARES
const isAuthenticated = require("../middlewares/isAuthenticated");

//ENDPOINTS

//GET ALL RECIPES
//TODO isAuthenticated, 
router.get('/', getAllRecipes, (req, res) => {
    res.status(200).json(res.allRecipes)
});

//GET RECIPE BY ID
//TODO isAuthenticated, 
router.get('/:id', getRecipeByID, (req, res) => {
    res.status(200).json(res.recipe)
});

//GET RECIPE BY isShared:true
// removes isAuthenticated, 
router.get('/public', getRecipesByIsPublic, (req, res) => {
    res.status(200).json(res.recipesByIsPublic)
});

//GET RECIPE BY isShared:false
// removes isAuthenticated, 
router.get('/private', getRecipesByIsPrivate, (req, res) => {
    res.status(200).json(res.recipesByIsPrivate)
});


//GET RECIPE BY AUTHOR
//TODO isAuthenticated, 
router.get('/author/:authorId', getRecipesByAuthorId, (req, res) => {
    res.status(200).json(res.recipesByAuthorId)
});


//CREATE RECIPE
router.post('/', createRecipe, (req, res) => {
    res.status(200).json(res.createdRecipe);
});

//UPDATE RECIPE
router.put('/:id', updateRecipe, (req, res) => {
    res.status(200).json(res.updatedRecipe);
});

//PATCH RECIPE
router.patch('/:id', updateRecipe, (req, res) => {
    res.status(200).json(res.patchedRecipe);
});

//DELETE RECIPE
router.delete('/:id', deleteRecipe, (req, res) => {
    res.status(200).json(res.deletedRecipe);
});

module.exports = router