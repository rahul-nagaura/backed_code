const express = require("express");
const { handleUserSignUp } = require("../controllers/index")
const { handleLogIn } = require("../controllers/login");

const {auth, isStudent, isAdmin } = require("../middlewares/auth");

const router = express.Router();


router.post("/signUp",handleUserSignUp);
router.post("/login", handleLogIn);


// testing route for single middlewares 
router.get("/test", auth, (req,res) => {
    res.json({
        success:true,
        message:"Welcome to the Proteected route for test"
    })
})

// Protected Route 

router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for student"
    })
})
 
router.get("/admin",auth, isAdmin, (req,res) =>{
    res.json({
        success:true,
        message: "Welcoome to the Protected route for Admin"
    })
})

module.exports = router;