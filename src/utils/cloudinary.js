import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

// upload to cloudinary
const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      // folder: "chai-backend",
      resource_type: "auto",
    });
    console.log("File uplaoded successfully on cloudinary!", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locaally file due to operation failed
    return null;
  }
};

export { uploadToCloudinary };
