const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const uploadAvatarImage = async (pathFile) => {
  const options = {
    folder: "userAvatars",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: [{ gravity: "face", height: 50, width: 50, crop: "fill" }],
  };
  try {
    const result = await cloudinary.uploader.upload(pathFile, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  uploadAvatarImage,
};
