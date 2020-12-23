const { Recipe } = require('../models/recipe.model');
const { ErrorHandler } = require('../helpers/error.helper');

//GET ALL RECIPES
const getAllRecipes = (req, res, next) => {
    Recipe.find({}, (error, recipes) => {
        try{
            if(error) next(error);
            if(!recipes || recipes.length === 0){
                throw new ErrorHandler(404, "Couldn't find any recipes");
            }else{
                res.allRecipes = recipes;
                next();
            }
        } catch(error) {
            next(error);
        }
    });
}


//CREATE NEW RECIPE
const createRecipe = (req, res, next) => {
    Recipe.create(req.body, (error, createdRecipe) => {
        try{
            if(error) next(error);
            if(!createdRecipe) throw new ErrorHandler(400, "Couldn't create recipe");
            res.createdRecipe = createdRecipe;
            next();
        }catch(error){
            next(error);
        }
    })
}

module.exports = {
    getAllRecipes,
    createRecipe
}