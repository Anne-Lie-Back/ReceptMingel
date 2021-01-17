const { ErrorHandler } = require('../helpers/error.helper');

module.exports = (req, res, next) => {
    try {
        if(req.session && req.session.userId) {
            next();
        }else{
            throw new ErrorHandler(403, "Ingen användare inloggad")
        } 
    } catch (error) {
        next(error)
    }
};