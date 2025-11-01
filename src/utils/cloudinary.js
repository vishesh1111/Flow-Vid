import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"



        });
        // file hasbeen uploaded successfully
        console.log("File uploaded to Cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        // it removes the locally saved temporary file as the upload operation. got failed
       return null;
    }
};

// Commenting out the automatic upload until we have proper credentials
/*
cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png", {
    public_id: "sample_image"
}, function (error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
    }
});
*/

export {uploadOnCloudinary};