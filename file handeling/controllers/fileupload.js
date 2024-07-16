const File = require("../models/index");
const cloudinary = require("cloudinary").v2;


exports.loacalFileUpload = async (req,res) => {
    try{
        const file = req.files.file;
        console.log("File AAGYI Jee", file);

        let path = __dirname + "/file"+ Date.now()+ `.${file.name.split(".")[1]}`;
        console.log("path",path);

        file.mv(path, (err) => {
            console.log(err)
        });

        res.json({
            success: true,
            message: "Local File upload successfully",
        })
    } catch(error) {
        console.log(error)
    }
}

 
function isFileTypeSupported(fileType, supportedTypes) {
    console.log("this is the ",supportedTypes.includes(fileType))
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file,folder,quality) {
    const options = {folder};
    console.log("temp file path");

    if(quality){
        options.quality = quality;
    }

    options.resource_type= "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


exports.imageUpload = async(req,res) =>{
    try{
        const {name,email,tags} = req.body;
        console.log(name,email,tags);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("fileType", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        };

        console.log("file upload");
        const response = await uploadFileToCloudinary(file,"codehelp");
        console.log(response);
        // db me entry save karni hai 

        const fileData = await File.create({
            name,email,tags,imageUrl: response.secure_url,
        })

        res.json({
            success:true,
            data: fileData,
            image:response.secure_url,
            message:"Image successgully uploaded"
        });


    } catch(err) {
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


exports.videoupload = async (req,res) =>{
    try{
        const {email,name,tags} = req.body;
        console.log(name,email,tags);

        const videoFile = req.files.videoFile;
        console.log(videoFile);

        const supportedTypes = ["mp4", "mov"];
        const fileType = videoFile.name.split(".")[1].toLowerCase();
        console.log("fileNmae",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(401).json({
                success: false,
                message:"file type not supported",
            })
        }
        
        console.log("uploading to cloudinary");
        const response = await uploadFileToCloudinary(videoFile, "codehelp");
        console.log(response);

        const newData = await File.create({
            name,email,tags,imageUrl: response.secure_url,
        })

        res.status(200).json({
            success: true,
            data:newData,
            video: response.secure_url,
            message:"video uploaded successfully"
        })
    } catch(err){
        console.log("error:",err);
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}


exports.imageSizeReducer = async(req,res) => {
    try{

        const {name,email,tags} = req.body;
        console.log(name,email,tags);

        const file = req.files.file;
        console.log("file:",file);

        supportedTypes = ["png", "jpg", "jpeg"];
        fileType = file.name.split(".")[1];
        console.log("file Type: ",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(403).json({
                success: false,
                message:"your file type is not supported"
            })
        }

        console.log("uploading file.......");
        const response = await uploadFileToCloudinary(file, "codehelp",50);
        console.log(response);

        const filedata = await File.create({
            name,email,tags,imageUrl:response.secure_url
        });

        res.status(200).json({
            success: true,
            data: filedata,
            image: response.secure_url,
            message:"Your data entered successfully"
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"intenal server error"
        })
    }
}