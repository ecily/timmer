const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

// Register user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    console.log('entry point auth controller')

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    })
    //console.log('++++++++++++++++++++++authController: ',result)

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })
    sendToken(user, 200, res)
})
//Login user => /api/v1/login
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const { email, password } = req.body
    
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    sendToken(user, 200, res)
})

//change user password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    //check previous password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched) {
        return next(new ErrorHandler('You old password is not correct', 400))
    }
    user.password = req.body.password
    await user.save()
    sendToken(user, 200, res)  
})

//update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //update avatar
    if(req.body.avatar !== '') {
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id
        const res = await cloudinary.v2.uploader.destroy(image_id)


//CLOUDINARY
//hier beginnt der dreck mit den cloudinary avataren
//problem ist - result is not defined



        // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        //     folder: 'avatars',
        //     width: 150,
        //     crop: "scale"
        // })
        const result = 'placeholder'
    }
    // newUserData.avatar = {
    //     public_id: result.public_id,
    //     url: result.secure_url
    // }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})

// Forgot password reset => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if(!user) {
        return next(new ErrorHandler('User not found', 404))
    }
    // Get reset token
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })

    // create reset password URL
    // development:
    //const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    // production:
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not reqested this, then pls. ignore`

    try {

        await sendEmail({
            email: user.email,
            subject: 'ShopIt Password recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    } catch(error) {
        user.getResetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }
})

// password reset => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user) {
        return next(new ErrorHandler('Password reset token invalid or expired', 400))
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Passwords do not match', 400))
    }

    //Set new password
    user.password = req.body.password
    user.getResetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)
})

//get current user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

//logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async(req, res,next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

//Admin routes
//Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async(req, res, next)=>{
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})
//get specific user => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async(req, res, next) =>{
    const user = await User.findById(req.params.id)

    if(!user) {
        return next(new ErrorHandler(`User with ID ${req.params.id} has not been found.`))
    }
    res.status(200).json({
        success: true,
        user
    })
})
//update user profile by admin => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
    })
})
//delete => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async(req, res, next) =>{
    const user = await User.findById(req.params.id)

    if(!user) {
        return next(new ErrorHandler(`User with ID ${req.params.id} has not been found.`))
    }

     // Remove avatar from cloudinary
     const image_id = user.avatar.public_id;
     await cloudinary.v2.uploader.destroy(image_id);

    await user.remove()

    res.status(200).json({
        success: true
    })
})