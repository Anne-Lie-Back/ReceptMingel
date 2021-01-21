const { User } = require('../models/user.model');
const { ErrorHandler } = require('../helpers/error.helper');

//REGISTER USER

const registerUser = (req, res, next) => {
    // TODO validate user
    const userToRegister = req.body;
    User.findOne({ username: userToRegister.username }, (error, queriedUser) => {
      try {
        if (error) next(error);
        if (!queriedUser) {
          User.create(userToRegister, (error, user) => {
            try {
              if (error) next(error);
              if (!user) throw new ErrorHandler(400, "Couldn't create new user");
              // store authentication session
              req.session.userId = user._id;
              res.user = user;
              next();
            } catch (error) {
              next(error);
            }
          });
        } else {
          throw new ErrorHandler(401, "Användarnamnet är upptaget");
        }
      } catch (error) {
        next(error);
      }
    });
  };

//GET ALL USERS
const getAllUsers = (req, res, next) => {
    User.find({}, (error, allUsers) => {
        try{
            if(error) next(error);
            if(!allUsers) throw new ErrorHandler(404, "Vi hittade inte några användare");
            res.allUsers = allUsers;
            next()
        } catch(error) {
            next(error);
        }
    });
};

// TODO
//GET USER BY ID

//GET SESSION USER
const getSessionUser = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        try{
            if(error) next(error);
            if(!user) throw new ErrorHandler(404, "Vi kunde inte hitta användare");
            res.user = user;
            next()
        } catch(error) {
            next(error);
        }
    });
};

//GET RECIPEBOOK FOR USER
const getRecipeBook = (req, res, next) => {
  User.find()
  .select("recipe _id")
  .populate('recipe')
  .exec()
  .then(data => {
    res.status(200).json({
      recipebook: data.map(data => {
        return {
          recipe: data.recipe,
          request: {
            type: "GET",
            url: "http://localhost:8080/recipes/" + data._id
          }
        };
      })
    });
  })
  .catch(error => {
    res.status(500).json({
      error: error
    });
  });
}

//UPDATE USER (both patch and put)
const updateUser = (req, res, next) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (error, updatedUser) => {
        try {
          if (error) next(error);
          if (!updatedUser) throw new ErrorHandler(400, "Vi kunde inte uppdatera användaren");
          res.updatedUser = updatedUser;
          next();
        } catch (error) {
          next(error);
        }
      }
    );
  };

//LOGIN USER
const loginUser = (req, res, next) => {
    try{
        const { username, password } = req.body;
        if(username && password){
            User.authenticate(username, password, (error, user) => {
                try{
                    if(error) next(error);
                    if(!user) throw new ErrorHandler(401, "Fel användarnamn eller lösenord");
                    req.session.userId = user._id;
                    res.user = user;
                    next();
                } catch(error) {
                    next(error);
                }
            })
        } else {
            throw new ErrorHandler(401, "Inget lösenord eller användarnamn");
        }
    }catch(error){
        next(error);
    };
};

//LOGOUT USER
const logoutUser = (req, res, next) => {
    try{
        if(req.session){
            req.session.destroy((error) => {
                if(error) next(error);
                //TODO få in denna när front end är klar
                //res.redirect('/')
                next();
            });
        }else{
            throw new ErrorHandler(404, "Ingen pågående session igång");
        }
    } catch (error) {
        next(error);
    }
};

//DELETE USER
const deleteUser = (req, res, next) => {
    User.findByIdAndDelete(req.params.id, (error, deletedResult) => {
        try{
            if(error) next(error);
            if(!deletedResult) throw new ErrorHandler(500, 'Kunde itne ta bort användare');
            res.deletedResult = deletedResult;
            next();
        } catch(error) {
            next(error);
        }
    });
};

module.exports = {
    registerUser,
    getAllUsers,
    getSessionUser,
    getRecipeBook,
    updateUser,
    loginUser,
    logoutUser,
    deleteUser
}