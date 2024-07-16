const mongoose = require("mongoose");
require("dotenv").config();
const nodemailer = require("nodemailer");


const fileSchema = new mongoose.Schema({
    name:{
        type:String
    },
    imageURL:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});

fileSchema.post("save", async function(doc) {
    try{

        console.log("doc: ", doc);  

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        });

        // send mail 
        let info = await transporter.sendMail({
            from: `CodeHelp - By Babbar`,
            to: doc.email,
            subject: "New file uploaded on cloudniary",
            html: `<h2>Hello Jee</h2> <p>Kaise Ho sare</p> `
        });
        console.log("INFO:", info)

    } catch(err){
        console.log(err);
    }
})

File = mongoose.model("file", fileSchema);
module.exports =File;