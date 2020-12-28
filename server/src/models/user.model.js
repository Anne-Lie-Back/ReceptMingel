const mongoose = require('mongoose');

const { RecipeSchema } = require('./recipe.model');

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    userInfo: {
        type: String,
        required: false,
    },
    recipes: {
        type: [RecipeSchema], 
        required: true
    },
    externalRecipes: [{
        type: String,
        required: true
    }],
})

const User = mongoose.model("User", UserSchema);
module.exports = { User, UserSchema };