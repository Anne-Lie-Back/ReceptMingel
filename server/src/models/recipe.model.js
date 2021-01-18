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
            type: mongoose.ObjectId,
            ref: "File",
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
        },
        timeStamp: {
            type: Date,
            required: true,
            default: Date.now,
        }
    },
    {
        //inkludes the virtual object to data so fetcher gets url to image
        id: false,
        toJSON: {
          virtuals: true,
        },
    }
);

//handles getting avatar-image-file
RecipeSchema.virtual("imageURL").get(function () {
return process.env.DOMAIN + this.image.toString();
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = { Recipe, RecipeSchema }