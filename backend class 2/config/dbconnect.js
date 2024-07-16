const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("mongodb connected successfully");
    } catch (err) {
        console.log("mongodb connection failed", err);
    }
};

module.exports = dbconnect;
