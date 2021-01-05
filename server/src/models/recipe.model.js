const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        preambleHTML: {
            type: String,
            required: true
        },
        //TODO Change to handle "real" images
        image: {
            type:String,
            required: true,
        },
        portions: {
            type: Number,
            required: true,
        },
        cookingTime: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        ingredients: [{
            type: String,
            required: true
        }],
        cookingSteps: [{
            type: String,
            required: true
        }],
        mdsaCategories: [{
            type: String,
            required: true
        }],
        author: {
            type: String,
            required: true
        },
        isShared:{
            type: Boolean,
            required: true
        }
    }
)

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = { Recipe, RecipeSchema }