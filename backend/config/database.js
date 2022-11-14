const mongoose=require("mongoose")


const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`Mongo db connected to server ${data.connection.host}`)
    })
    // Removed this catch because unhanled promise rejection will be handled in server.js last comment
    // .catch((err)=> console.log(err))

}

module.exports=connectDatabase


