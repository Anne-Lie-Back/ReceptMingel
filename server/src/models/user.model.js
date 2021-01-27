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
    userInfo: {
        type: String,
        required: false,
    },
    //sets referense to profile-picture in image-bucket at mongoDb
    image: {
      type: mongoose.ObjectId,
      ref: "File",
    },
    //TODO update to [RecipeSchema] ? (see order-schema)
    recipeBook: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: false,
    }],
    externalRecipes: [{
        type: String,
        required: false
    }],
  },
  {
    //inkludes the virtual object to data so fetcher gets url to image
    id: false,
    toJSON: {
      virtuals: true,
  },
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
  UserSchema.virtual("imageURL").get(function () {
    return process.env.DOMAIN + this.image.toString();
  });

// rehashes password when user is updated, enables possibility for user to change their password
UserSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
    const user = this;

    if (!user._update.password) {
      return next()
    }
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

const User = mongoose.model("User", UserSchema);
module.exports = { User, UserSchema };