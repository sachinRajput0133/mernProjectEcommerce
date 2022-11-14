const stripe = require('stripe')("sk_test_51LybJPSChk4tArs208sC7sBgX3wYo0TiTfrAK7479NNghbodAOtVYCmd5Xtf3TkydXEx9MN4tyG8m6o6ioZhWFGk00lJJeLWAW");
const catchAsyncErrors=require("../middleware/catchAsyncErrors")

exports.processPayment=catchAsyncErrors(async(req,res,next)=>{
    // console.log(process.env.STRIPE_SECRET_KEY)
   
const myPayment=await stripe.paymentIntents.create({
    
    amount:req.body.amount,
    currency:"inr",
    metadata:{
        company:"Ecommerce"
    }
})

res.status(200).json({success:true,client_secret:myPayment.client_secret})

})

exports.sendStripeApiKey=catchAsyncErrors(async(req,res,next)=>{
    
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY})
})