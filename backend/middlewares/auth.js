const User = require('../models/user')

const catchAsyncErrors = require('./catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')


//Check if user is authenthicated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next) => {
    
    const { token } = req.cookies
    
    if(!token) {
        return next(new ErrorHandler('Pls. login first', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //const decoded = jwt.verify(token, 'laksjfdÄÄ09909iue')
    
    req.user = await User.findById(decoded.id)

    next()

})

//verify user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(
            new ErrorHandler(`Role (${req.user.role}) is not allowed to access that`, 403)
            )
        }
        next()
    }
}