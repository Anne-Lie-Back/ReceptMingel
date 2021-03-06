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
};

//GET RECIPE BY ID
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
};

//GET RECIPE BY IsShared
const getRecipesByIsPublic = (req, res, next) => {
    Recipe.find({isShared}, (error, recipesByIsPublic) => {
        try{
            if(error) next(error);
            //if(!recipesByIsPublic || recipesByIsPublic.length === 0) throw new ErrorHandler(404, "Vi kunde inte hitta några recept");
            res.recipesByIsPublic = recipesByIsPublic
            next()
        }catch(error){
            next(error);
        };
    });
};

//GET RECIPE PRIVATE
const getRecipesByIsPrivate = (req, res, next) => {
    Recipe.find({isShared: false, authorId: req.params.authorId}, (error, recipesByIsPrivate) => {
        try{
            if(error) next(error);
            if(!recipesByIsPrivate || recipesByIsPrivate.length === 0) throw new ErrorHandler(404, "Vi kunde inte hitta några recept");
            res.recipesByIsPrivate = recipesByIsPrivate
            next()
        }catch(error){
            next(error);
        };
    });
};

//GET RECIPES BY AUTHOR
const getRecipesByAuthorId = (req, res, next) => {
    Recipe.find({authorId: req.params.authorId}, (error, recipesByAuthorId) => {
        try{
            if(error) next(error);
            if(!recipesByAuthorId || recipesByAuthorId.length === 0) throw new ErrorHandler(404, "Vi kunde inte hitta några recept");
            res.recipesByAuthorId = recipesByAuthorId
            next()
        }catch(error){
            next(error);
        };
    });
}; 

//GETS RECIPES THROUGH A FUZZY SEARCH
const searchRecipe = async(req, res, next) => {
    try{
        const result = await Recipe.fuzzySearch(req.params.term)

        res.result = result.filter(i => i.isShared === true);
        next()
    }catch(error){
        console.error(error)
    }
}


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

//UPDATE RECIPE (both patch and put)
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
};

module.exports = {
    createRecipe,
    deleteRecipe,
    getAllRecipes,
    getRecipeByID,
    getRecipesByAuthorId,
    getRecipesByIsPrivate,
    getRecipesByIsPublic,
    searchRecipe,
    updateRecipe,
};