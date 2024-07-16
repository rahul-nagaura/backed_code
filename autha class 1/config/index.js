const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async() => {
    try{
        await mongoose.connect(process.env.URL);
        console.log("mongodb connected successfully");
    }catch(err){
        console.log("mongodb connection failed");
    }
}

module.exports = dbConnect;