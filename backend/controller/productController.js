const Product = require("../model/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apiFeatures")
const cloudinary=require("cloudinary")




// create products--Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

let images=[];
if( typeof  req.body.images==="string"){
 images.push(req.body.images);

}else{
    images=req.body.images;
    

}

const imagesLinks=[]

for(let i=0;i<images.length;i++ ){
    const result=await cloudinary.v2.uploader.upload(images[i],{
        folder:"products"
    }
 )
 imagesLinks.push({
    public_id:result.public_id,
    url:result.secure_url,
 })

}
req.body.images=imagesLinks

    req.body.user = req.user.id  //req.user_id doubt? done
    // console.log(req.user.id)

    const product = await Product.create(req.body)
    res.status(201).json({ success: true, product })
})




// get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

//     const resultPerPage=8
//     const productsCount = await Product.countDocuments();


//     const apiFeatures = new ApiFeatures(Product.find(), req.query)
//         .search()
//         .filter()
//         // .pagination(resultPerPage)
//         let products=await apiFeatures.query
//    let filteredProductsCount=products.length
//         console.log(filteredProductsCount)

//         apiFeatures.pagination(resultPerPage)
//    products = await apiFeatures.query
const resultPerPage = 12;
const productsCount = await Product.countDocuments();

const apiFeature = new ApiFeatures(Product.find(), req.query)
  .search()
  .filter();

let products = await apiFeature.query;

let filteredProductsCount = products.length;

apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();


    res.status(200).json({ success: true, products, productsCount,resultPerPage ,filteredProductsCount })
})
// get all products--admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
      
    const products=await Product.find()




    res.status(200).json({ success: true, products })
})

// update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {


    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    // Images- start  here
    let images=[]

    if(typeof req.body.images ==="string"){
        images.push(req.body.images)
       
    }else{
        images=req.body.images
    }
   
     
    if(images !== undefined){

        //Delete image from cloudinary
        for(let i=0;i<product.images.length;i++){
            await cloudinary.v2.uploader.destroy(
                product.images[i].public_id
            )
          }
        
    }
    // create link
    const imagesLinks=[]

    for(let i=0;i<images.length;i++ ){
        const result=await cloudinary.v2.uploader.upload(images[i],{
            folder:"products"
        }
     )
     imagesLinks.push({
        public_id:result.public_id,
        url:result.secure_url,
     })
    
    }
    req.body.images=imagesLinks
    
   


    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindndModify: false })

    res.status(200).json({ success: true, product })

})

// delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

// Deleting images from Cloudinary
  for(let i=0;i<product.images.length;i++){
    await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
    )
  }

    // product=await Product.findByIdAndDelete(req.params.id)
    await product.remove()

    res.status(200).json({ success: true, message: "Product Deleted Successfully" })



})


// get single product or product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
        // .....................
        // return res.status(404).json({success:false,message:"Product not Found"})
        // ...........
    }
    res.status(200).json({ success: true, product })


})

// Create review or update review 
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId);
    // console.log(product)


    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
    // console.log("hiiii")
    if (isReviewed) {
            product.reviews.forEach((rev)=>{
                if( rev.user.toString() === req.user._id.toString()) (rev.rating=rating),(rev.comment=comment)
                  
            })


    } else {

        product.reviews.push(review)
        product.numOfReviews=product.reviews.length
    }

     let avg=0
     product.reviews.forEach((rev)=>{
        avg+=  rev.rating
     })

     product.ratings=avg/product.reviews.length
    // product.ratings=5

    //  console.log(product.ratings)
await product.save({validateBeforeSave:false})



res.status(200).json({
    success:true
})



})


// Get all reviewes of a product
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
    const product =await Product.findById(req.query.id);
   if(!product){
    return next(new ErrorHandler("Product not found",404));
   }

   res.status(200).json({
    success:true,
    reviews:product.reviews,
   })


})

// Delete Review

exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
    // this is product id
    const product =await Product.findById(req.query.productId);
   if(!product){
    return next(new ErrorHandler("Product not found",404));
   }
    //  this is review id req.query.id
    
   const reviews=product.reviews.filter((rev)=> rev._id.toString() !==req.query.id.toString() )

   let total=0;
   reviews.forEach((rev)=>  total+= rev.rating)
 
 let ratings=0
   if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings=total/reviews.length
  }
  
   
   const numOfReviews=reviews.length
//   console.log(numOfReviews)
   await Product.findByIdAndUpdate(req.query.productId,{
    reviews,ratings,
    numOfReviews
   },
   {
    new:true,
    runValidators:true,
    useFindndModify:false
   }
   )
//    console.log("hello2")

   res.status(200).json({
    success:true,
   
   })


})




