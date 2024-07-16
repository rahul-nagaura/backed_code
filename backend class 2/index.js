const express = require("express");
const Todo = require("./models/index");
const app = express();

const router = require("./routes/index");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({extended: true}));
app.use(express.json(true));

app.use("/", router);

app.listen(PORT, () => {
    console.log("server started at port:", PORT);
});

const dbconnect = require("./config/dbconnect");
dbconnect(); 

app.get("/123", (req,res) => {
    console.log("How are you ");
    res.send("This is homePage");
})

