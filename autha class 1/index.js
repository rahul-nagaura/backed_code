const express = require("express");
const cookieparser = require("cookie-parser");
const router = require("./routes/index");
const dbConnect = require("./config/index");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));;
dbConnect();


app.use("/user/", router);
app.get("/", (req,res) => {
    res.send("This is howepage");
})

app.listen(PORT, () => {
    console.log("server started at PORT:",PORT);
})