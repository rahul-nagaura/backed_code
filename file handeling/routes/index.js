const express = require("express");
const router = express.Router();
const {loacalFileUpload, imageUpload, videoupload,imageSizeReducer} = require('../controllers/fileupload');

router.post("/", loacalFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoupload", videoupload);
router.post("/imageSizeReducer", imageSizeReducer);

router.get("/", (req,res) => {
    console.log("This is the best practice");
    res.send("This is home page")
})


module.exports = router;