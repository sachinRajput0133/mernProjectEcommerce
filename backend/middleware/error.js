const ErrorHandler =require("../utils/errorHandler")

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error V1"

// Wrong MongoDB Id Error
if(err.name==="CastError"){
    const message=`Resource not found. Invalid: ${err.path}`;
    err=new ErrorHandler(message,400)
}

// Mongo db duplicate key error

if(err.code === 11000){
// its not compulsory error id due to duplicate email could be due to any duplicate k

    const message=`Duplicate ${Object.keys(err.keyValue)} Entered`
    err=new ErrorHandler(message,400)
}

// Wrong jsonwebtoen error
if(err.name === "jsonWebTokenError"){
    
        const message=`json Web Token is invalid, try again`
        err=new ErrorHandler(message,400)
    }
    
    // JWT Expire error
 if(err.name === "TokenExpiredError"){
        
            const message=`json Web Token is Expired, try again`
            err=new ErrorHandler(message,400)
        }

// validation error
if(  err?.errors?.name?.name === "ValidatorError"){
        
    const message=err.errors.name.message
    err=new ErrorHandler(message,400)
}
// emailvalidator
if(  err?.errors?.email?.name === "ValidatorError"){
        
    const message=err.errors.email.message
    err=new ErrorHandler(message,400)
}
// password validator
if(  err?.errors?.password?.name === "ValidatorError"){
        
    const message=err.errors.password.message
    err=new ErrorHandler(message,400)
}



    res.status(err.statusCode).json({success:false,message:err.message});
}
