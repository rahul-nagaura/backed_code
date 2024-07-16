const User = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogIn = async(req,res) => {
    try{
        const {email, password } = req.body;
        if(!email || !password){
            return res.status(400)
            .json({
                success:true,
                message:"please fill all the data"
            })
        }

        let existenes = await User.findOne({email});
        if(!existenes){
            return res.status(400)
            .json({
                success: false,
                message: "Please create a new user"
            })
        }

        const payload = {
            email: existenes.email,
            id:existenes._id,
            role:existenes.role
        }

        if(await bcrypt.compare(password,existenes.password) ) {
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,{
                    expiresIn:"2h"
                }
            );
            existenes = existenes.toObject();
            existenes.token = token;
            existenes.password = undefined;
            const option = {
                expires: new Date( Date.now() + 30000),
                httpOnly: true,
            }

            // res.status(200).json({
            //     success:true,
            //     token,
            //     existenes,
            //     message: "User logged in successfully",
            // })
            console.log("token",token);
            res.cookie("token", token, option).status(200).json({
                success:true,
                token,
                existenes,
                message: "User logged in successfully",
            })
        }
        else{
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            })
        }

    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login Failure"
        });
    }
}

module.exports = {
    handleLogIn
}