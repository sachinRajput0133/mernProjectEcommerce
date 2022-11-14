const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name Cannot Exceed 30 Characters"],
        minLength:[4, "Name Should Have More Than 4 Characters"],
     
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique: true,
        validate:[validator.isEmail,"Please Enter Valid Email"],

    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password should be greater than 8 characters"],
        select:false, 
    },
    avatar:{
        
            public_id: {
                type: String,
                required: true
            },
           url: {
                type: String,
                required: true
            },
      },
      role:{
        type:String,
        default:"user",
      },
      createdAt:{
type:Date,
default:Date.now
      },
      resetPasswordToken:String,
      resetPasswordExpire:Date,

})

// bcrypt password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
          next()
    }

    this.password=await bcrypt.hash(this.password,12)
})

// jwt token method
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

// Compare password
userSchema.methods.ComparePassword=async function(enteredPassword){
   return   bcrypt.compare(enteredPassword,this.password)
}

// Genetating password reset token
userSchema.methods.getResetPasswordToken=function(){
// Generate Token
const resetToken=crypto.randomBytes(20).toString("hex");
this.resetPasswordToken=crypto.createHash("sha256")
.update(resetToken)
.digest("hex")

this.resetPasswordExpire=Date.now() + 15*60*1000;
return resetToken

}



module.exports = mongoose.model("User", userSchema);

// const User=mongoose.model("User",userSchema)
// module.exports=User