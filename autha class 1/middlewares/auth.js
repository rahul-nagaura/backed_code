
// auth isStudent isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    try {
        // token 
        // const token = req.body.token;
        

        let token = req.cookies.token || req.body.token ;
        console.log("cookie", req.cookie.token);
        console.log("body", req.body.token);
        console.log("token from auth ", token);

        // || req.header("Authorization").replace("Bearer ", "")

        // if (token && token.startsWith("Bearer ")) {
        //     token = token.slice(7); // Remove "Bearer " from token string
        // }

        if (!token){
            return res.status(401)
            .json({
                success: false,
                message: "Token Missing",
            });
        }

        // verify 

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            })
        }
        
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong",
        })
    }
}


const isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students only"
            });
        }
        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "This route is not for you"
        })
    }
}

const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admins only"
            });
        }
        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "This route is not for you"
        })
    }
}

module.exports = {
    auth,
    isStudent,
    isAdmin
};