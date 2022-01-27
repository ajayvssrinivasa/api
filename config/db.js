const db= "mongodb://localhost:27017/employee";
const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        await mongoose.connect(db, {useNewUrlParser:true});
        console.log("MongoDB connected");
    }
    catch(err){
        console.log(err.message);
    }
}
module.exports=connectDB;