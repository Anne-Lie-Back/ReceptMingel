const express = require('express');
const router = express.Router();

const {
    getAllRecipes, 
    getRecipeByID,
    getRecipesByAuthor,
    createRecipe,
    updateRecipe,
    deleteRecipe
} = require('../handlers/recipe.handlers');

// MIDDLEWARES

//HANDLERS

//ENDPOINTS

//GET ALL RECIPES
router.get('/', getAllRecipes, (req, res) => {
    res.status(200).json(res.allRecipes)
});

//GET ONE RECIPE
router.get('/:id', getRecipeByID, (req, res) => {
    res.status(200).json(res.recipe)
})

//GET RECIPE BY FREETEXT

//GET RECIPE BY DIFFICULTY
router.get('/author/:author', getRecipesByAuthor, (req, res) => {
    res.status(200).json(res.recipesByAuthor)
})

//GET RECIPE BY COOKINGTIME

//GET RECIPE BY AUTHOR

//CREATE RECIPE
router.post('/', createRecipe, (req, res) => {
    res.status(200).json(res.createdRecipe);
});

//UPDATE RECIPE
router.put('/:id', updateRecipe, (req, res) => {
    res.status(200).json(res.updatedRecipe);
});

//DELETE RECIPE
router.delete('/:id', deleteRecipe, (req, res) => {
    res.status(200).json(res.deletedRecipe);
});

module.exports = router