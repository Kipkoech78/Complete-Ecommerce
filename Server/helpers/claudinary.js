require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key:process.env.APIKEY,
    api_secret: process.env.APISECRET
});

const storage = new multer.memoryStorage();
async function ImageUploadUtils(file){
    const results = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    });
    return results
}
const upload = multer({storage});
module.exports ={upload, ImageUploadUtils}