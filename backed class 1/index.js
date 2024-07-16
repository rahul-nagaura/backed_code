const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/myDatabase",{ useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => {
        console.log("Mongodb connected successfully");
    }).catch((err) => {
        console.log(err);
        console.log("mongodb connection failed");
    })

 const carSchema = new mongoose.Schema({
    name: String,
    Age: Number,
 })
const car = mongoose.model("car", carSchema);

app.get("/", 
    (req,res) => {
        res.send("You are at homepage");
    }
)

app.post("/cars", (req,res) => {
    const {name, Age} = req.body;
    res.send("This is your car's list")
})

app.listen(PORT, () => {
    console.log("Servet Started at port:", PORT)
})