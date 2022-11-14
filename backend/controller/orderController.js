const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../model/productModel")
// create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


const order=await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id
})
    res.status(201).json({
        success:true,
        order
    })

});

// get single order
exports.getSingleOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }



    res.status(200).json({success:true,order})
    


})



// get loggedin user orders  for user who wana see his orders
exports.myOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id})


    res.status(200).json({success:true,orders})



})

// Get All Orders -- Admin
exports.getAllOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find()

let totalAmount=0
        
  orders.forEach((order)=> totalAmount+= order.totalPrice)       

    res.status(200).json({success:true,totalAmount,orders})



})

// Update Order Status   -- Admin                                               -- Admin
exports.updateOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    
    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
      }
   
    if(req.body.status==="Shipped"){
        order.orderItems.forEach(async(o)=>{
            await updateStock(o.id,o.quantity)
   
       })
    }
           
    order.orderStatus=req.body.status;
    if(req.body.status === "Delivered"){
      
        order.deliveredAt = Date.now()
    }
 

   await order.save({validateBeforeSave:false})
    res.status(200).json({success:true,order})



})

// update stock function
async function updateStock(id,quantity){
     const product=await Product.findById(id)
      product.stock=product.stock-quantity

      await product.save({validateBeforeSave:false})


}



// delete Order    -- Admin                                               -- Admin
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
   await order.remove()
          
   if(!order){
    return next(new ErrorHandler("Order not found with this id",404))
}


    res.status(200).json({success:true,})



})