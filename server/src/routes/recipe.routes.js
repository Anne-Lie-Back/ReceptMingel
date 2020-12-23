const express = require('express');
const router = express.Router();

const {
    getAllRecipes, 
    createRecipe 
} = require('../handlers/recipe.handlers');

// MIDDLEWARES

//HANDLERS

//ENDPOINTS

//GET ALL RECIPES
router.get('/', getAllRecipes, (req, res) => {
    res.status(200).json(res.allRecipes)
});

//GET ONE RECIPE

//GET RECIPE BY FREETEXT

//GET RECIPE BY DIFFICULTY

//GET RECIPE BY COOKINGTIME

//GET RECIPE BY AUTHOR

//CREATE RECIPE
router.post('/', createRecipe, (req, res) => {
    res.status(200).json(res.createdRecipe);
});

//PUT RECIPE

//DELETE RECIPE

module.exports = router