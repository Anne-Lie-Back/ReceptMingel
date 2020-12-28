const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../helpers/error.helper');

const { RecipeSchema } = require('./recipe.model');

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
});

//hashes password when user is created
UserSchema.pre('save', (next) => {
    const user = this;
    bcrypt.hash( user.password, 10, (err, hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

//authenticates password input
UserSchema.statics.authenticate = (username, password, callback) => {
    User.findOne({ username: username }).exec((err, user) => {
        if(err) return callback(err);
        else if(!user){
            const err = new ErrorHandler( 401, "Användaren hittades inte");
            return callback(err);
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if(result === true){
                return callback(null, user);
            } else {
                return callback();
            }
        })
    })
}

const User = mongoose.model("User", UserSchema);
module.exports = { User, UserSchema };