const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//TODO just save id for schema or save ref to whole schema?
//const { RecipeSchema } = require('./recipe.model');

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
        type: mongoose.ObjectId,
        ref: "File",
    },
    userInfo: {
        type: String,
        required: false,
    },
    //TODO update to [RecipeSchema] ? (see order-schema)
    recipeBook: [{
        type: String,
        required: false,
    }],
    externalRecipes: [{
        type: String,
        required: false
    }],
});

//hashes password when user is created
UserSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });

  //handles getting avatar-image-file
  UserSchema.virtual("avatarImageURL").get(() => {
    return process.env.DOMAIN + this.avatar.toString();
  })

  //TODO: Refactorize later
/* UserSchema.pre('save', (next) => {
    const user = this;
    bcrypt.hash( user.password, 10, (err, hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
    });
}); */


// rehashes password when user is updated, enables possibility for user to change their password
UserSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
    const user = this;
    bcrypt.hash(user._update.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user._update.password = hash;
      next();
    });
});

//authenticates password input
UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ username: username }).exec(function (err, user) {
      if (err) return callback(err);
      else if (!user) {
        var err = new Error("User not found.");
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      });
    });
  };

  //TODO: Refactorize later
/* UserSchema.statics.authenticate = (username, password, callback) => {
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
 */
const User = mongoose.model("User", UserSchema);
module.exports = { User, UserSchema };