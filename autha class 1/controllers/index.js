const User = require("../models/index");
const bcrypt = require("bcrypt");
const handleUserSignUp = async (req, res) => {


    try {
        const { name, email, password, role } = req.body;
        // user is not valid /
        if (!name || !email || !password || !role) {
            return res.send(404)
                .json({
                    message: "user not valid"
                })
        }
        // if user already exist 
        const existenese = await User.findOne({ email });
        if (existenese) {
            return res.status(400).json({ message: "user already exist" })
        }


        let hasgedpassword;
        try {
            hasgedpassword = await bcrypt.hash(password, 8);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing"
            })
        }


        const newUser = await User.create({
            name, email, password: hasgedpassword, role
        })

        res.status(200).json({
            success: true,
            data: newUser,
            message: "New user created successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "server side problem"
        })
    }
}

module.exports = {
    handleUserSignUp
};