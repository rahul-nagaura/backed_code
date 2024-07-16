const express = require("express");
const router = require("./routes/index");
const dbconnect = require("./config/dbconnet");
const cloudinary = require("./config/cloudinary");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


dbconnect();
cloudinary.cloudinaryConnect();

app.use("/file", router);

app.listen(PORT, (req,res) => {
    console.log("Server created successfully at PORT:",PORT);
})