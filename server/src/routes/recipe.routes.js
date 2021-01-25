const express = require('express');
const router = express.Router();
const { Recipe } = require('../models/recipe.model');


//HANDLERS
const {
    getAllRecipes, 
    getRecipeByID,
    getRecipesByIsPublic,
    getRecipesByIsPrivate,
    getRecipesByAuthorId,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipe
} = require('../handlers/recipe.handlers');

// MIDDLEWARES
const isAuthenticated = require("../middlewares/isAuthenticated");

//ENDPOINTS

//GET ALL RECIPES
router.get('/', getAllRecipes, (req, res) => {
    res.status(200).json(res.allRecipes)
});

//GET RECIPE BY ID
//TODO maybe remove so you can chare recipe to others
router.get('/:id', getRecipeByID, (req, res) => {
    res.status(200).json(res.recipe)
});

//GET RECIPE BY SEARCH
router.get('/search/:term', searchRecipe, (req, res) => {
    res.status(200).json(res.result)
});

//GET RECIPE BY isShared:true
router.get('/public', getRecipesByIsPublic, (req, res) => {
    res.status(200).json(res.recipesByIsPublic)
});

//GET RECIPE BY isShared:false
router.get('/private', isAuthenticated, getRecipesByIsPrivate, (req, res) => {
    res.status(200).json(res.recipesByIsPrivate)
});


//GET RECIPE BY AUTHOR
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