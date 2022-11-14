const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt=require("jsonwebtoken");
const User = require("../model/userModel");
exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
 const {token}=req.cookies
//  we will get object but by doing destructuring will not get objectonly get token
//  console.log(token)
if(!token){
    return next(new ErrorHandler("Please Login To access this resource",401));
}

const decodedData=jwt.verify(token,process.env.JWT_SECRET);
// const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
// console.log(verifyToken)
// while making token we asign id to jet {id:user_id}

// by doing this we can access the data of user untill user is logged in
req.user= await User.findById(decodedData.id)
next()



 

})
// admin authorize
exports.authorizedRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
        return  next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`,403))
        }
        next()
    }
}

