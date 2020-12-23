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
        imageURL: {
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
        //TODO remove object _ID for ingredients
        ingredients: [
            {
                quantityFraction: {
                    type: String,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
                ingredient: {
                    type: String,
                    required: true,
                },
            },
        ],
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