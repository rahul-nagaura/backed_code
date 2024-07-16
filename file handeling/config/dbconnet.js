const mongoose = require("mongoose");
require("dotenv").config();


const dbconnect = async () => {
    mongoose.connect(process.env.URL)
    .then(console.log("mongodb connection successfully"))
    .catch( (err) => {
        console.log("mongodb connection Issues");
        console.error(err);
        process.exit(1);
    })
}

module.exports = dbconnect;