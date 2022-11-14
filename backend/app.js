const express=require("express")
const productRoute=require("./routes/productRoute")
const errorMiddleware=require("./middleware/error")
const userRoute=require("./routes/userRoute")
const orderRoute=require("./routes/orderRoute")
const cors=require("cors")

const path=require("path")
const bodyParser=require("body-parser")
const fileUpload=require("express-fileupload")
const paymentRoute=require('./routes/paymentRoute')
const cookieParser=require("cookie-parser")
const app=express()


// config
if(process.env.NODE_ENV !=="PRODUCTION"){
   
    require("dotenv").config({path:"backend/config/config.env"});
}

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.json({ limit: "50mb" }));
//  app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload())
// route import
app.use(cors())
app.use("/api/v1",productRoute)
app.use("/api/v1",userRoute)
app.use("/api/v1",orderRoute)
app.use("/api/v1",paymentRoute)

app.use(express.static(path.join(__dirname,"../frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})
// middleware for error
app.use(errorMiddleware)

module.exports =app