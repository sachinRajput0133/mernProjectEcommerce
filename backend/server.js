const app=require("./app")

const connectDatabase = require("./config/database");
const cloudinary=require("cloudinary")
// Handeling Uncaught error
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down The Server Due To Uncaught Exception`)
    process.exit(1)
})



// config 
if(process.env.NODE_ENV !=="PRODUCTION"){
   
    require("dotenv").config({path:"backend/config/config.env"});
}

// connecting to detabase
connectDatabase()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const PORT=process.env.PORT

const server= app.listen(PORT,()=>{
console.log(`server is running on http://localhost:${PORT}`)
})


// Unhandled Promis rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down The Server Due To Unhandled Promise Rejection`)
    server.close(()=>{
        process.exit(1)
    })
})