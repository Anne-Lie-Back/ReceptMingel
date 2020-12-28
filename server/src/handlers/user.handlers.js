const { User } = require('../models/user.model');
const { ErrorHandler } = require('../helpers/error.helper');

//REGISTER USER

const registerUser = (req, res, next) => {
    const userToRegister = req.body.user;
    User.findOne({ username: userToRegister.username }, (error, queriedUser) => {
        try {
            if(error) next(error);
            if(!queriedUser){
                User.create(userToRegister, (error, user) => {
                    try {
                        if(error) next(error);
                        if(!user) throw new ErrorHandler(400, 'Kunde inte skapa en ny användare');
                        req.session.userId = user._id;
                        res.user = user;
                        next();
                    } catch(error) {
                        next(error);
                    }
                });
            } else {
                throw new ErrorHandler(401, "Användarnamnet är tyvärr upptaget")
            }
        } catch(error){
            next(error);
        }
    });
};

//GET ALL USERS


// TODO
//GET USER BY ID

//GET USER

//UPDATE USER

//LOGIN USER

//LOGOUT USER

//DELETE USER

module.exports = {
    registerUser
}