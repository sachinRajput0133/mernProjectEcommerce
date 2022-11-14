const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const bcrypt = require("bcryptjs")
const User = require("../model/userModel")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary=require("cloudinary")

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
     const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
     })
    const { name, email, password } = req.body
    
    const user = await User.create({
        name, email, password, avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    })
  
    sendToken(user, 201, res)


})

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400))
    }

    const user = await User.findOne({ email: email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400))
    }

    const isPasswordMatched = await user.ComparePassword(password)
    //   const isPasswordMatched=await bcrypt.compare(password,user.password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400))
    }
    // ...............................
    //     const token=user.getJwtToken()

    //   res.status(200).json({success:true,token})
    // .........................
    sendToken(user, 200, res)

}

)

// Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })


    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    })


})


// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }
    // Get reset password token
    const resetToken = user.getResetPasswordToken();
    // saving the user uith resetand expire 
    // during front end req.protocol is of backend and we are running front end on3000 so temperarly we need to give front end address
    await user.save({ validateBeforeSave: false })
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}` now ports are same so no need of this
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} if you have not requested this email then please ignore it `
    
    try {


        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,

        }, res)

        res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully` })






    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(err.message, 500))
    }

})


// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Creating token hash
    const resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.token)
        .digest("hex")


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Reset Password Token Is Invalid or Has Been Expired", 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save()
    sendToken(user, 200, res)
})



// Get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    // user is logged in so can get user detail any time  so will get user id by req.user.id

    const user = await User.findById(req.user.id)

    // no need to do (!user) because when user is logged in then only we are geting details 

    res.status(200).json({ success: true, user })



})

// Update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.ComparePassword(req.body.oldPassword)
    //   const isPasswordMatched=await bcrypt.compare(password,user.password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400))
    }

    user.password = req.body.newPassword
    await user.save()
    sendToken(user, 200, res)


})


// Update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.user.id)
    // console.log("hello")
    const newUserData = {
        name: req.body.name,
        email: req.body.email

    }
    // will add cloudinary later
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false

    })

    res.status(200).json({
        success: true, user
    })



})

// Get all users --Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({ success: true, users })

})
 
// Get single users details --Admin

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`, 401))
    }

    res.status(200).json({ success: true, user })

})


// Update user Role --Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.user.id)
    // console.log("hello")
    const newUserDate = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,

    }
    let user=await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`User Does Not Exist With Id:${req.params.id}`),400)
    }

     user = await User.findByIdAndUpdate(req.params.id, newUserDate, {
        new: true,
        runValidators: true,
        useFindAndModify: false

    })

    

    res.status(200).json({
        success: true, user
    })



})


// Delete user  --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.user.id)
    // console.log("hello")
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`, 404))
    }

      const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
     

    await user.remove()
    // delete cloudinary





    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })



})