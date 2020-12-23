const { Recipe } = require('../models/recipe.model');
const { ErrorHandler } = require('../helpers/error.helper');

//GET ALL RECIPES
const getAllRecipes = (req, res, next) => {
    Recipe.find({}, (error, recipes) => {
        try{
            if(error) next(error);
            if(!recipes || recipes.length === 0){
                throw new ErrorHandler(404, "Vi hittade inga recept");
            }else{
                res.allRecipes = recipes;
                next();
            }
        } catch(error) {
            next(error);
        }
    });
}

//GET ONE RECIPE
const getRecipeByID = (req, res, next) => {
    Recipe.findById(req.params.id, (error, recipe) => {
        try{
            if(error) next(error);
            if(!recipe) throw new ErrorHandler(404, "Vi kunde tyvärr inte hitta receptet");
            res.recipe = recipe;
            next();
        }catch(error){
            next(error);
        }
    })
}

//GET RECIPE BY DIFFICULTY
const getRecipesByDifficulty = (req, res, next) => {
    Recipe.find({difficulty: req.params.difficulty}, (error, recipesByDifficulty) => {
        try{
            if(error) next(error);
            if(!recipesByDifficulty || recipesByDifficulty.length === 0) throw new ErrorHandler(404, "Vi kunde inte hitta några recept som matchade vald svårighetsgrad");
            res.recipesByDifficulty = recipesByDifficulty
            next()
        }catch(error){
            next(error);
        };
    });
}; 


//CREATE NEW RECIPE
const createRecipe = (req, res, next) => {
    Recipe.create(req.body, (error, createdRecipe) => {
        try{
            if(error) next(error);
            if(!createdRecipe) throw new ErrorHandler(400, "Vi kunde tyvärr inte spara receptet");
            res.createdRecipe = createdRecipe;
            next();
        }catch(error){
            next(error);
        }
    });
};

//UPDATE RECIPE
const updateRecipe = (req, res, next) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedRecipe) => {
        try{
            if(error) next(error);
            if(!updatedRecipe) throw new ErrorHandler(400, "Vi kunde tyvärr inte uppdatera receptet")
            res.updatedRecipe = updatedRecipe;
            next();
        }catch(error){
            next(error);
        }
    });
};

//DELETE RECIPE
const deleteRecipe = (req, res, next) => {
    Recipe.findByIdAndDelete(req.params.id, (error, deletedRecipe) => {
        try{
            if(error) next(error);
            if(!deletedRecipe) throw new ErrorHandler(404, "Kunde inte ta bort recept");
            res.deletedRecipe = deletedRecipe;
            next()
        }catch(error){
            next(error)
        }
    })
}

module.exports = {
    getAllRecipes,
    getRecipeByID,
    getRecipesByDifficulty,
    createRecipe,
    updateRecipe,
    deleteRecipe
}