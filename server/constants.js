const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const Datauri = require("datauri/parser");
const path = require("path");

const cloudinaryConfig = (req, res, next) => {
  cloudinary.config({
    cloud_name: "dmsynjpqu",
    api_key: "432989823973224",
    api_secret: "HKWn8P5OlL6vkco2lysztOZltNs",
  });
  next();
};

exports.cloudinary = { cloudinaryConfig, uploader: cloudinary.uploader };

const multerStorage = multer.memoryStorage();
const multerUploads = multer({ multerStorage });

const dUri = new Datauri();

const datauri = (req) =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
exports.multer = { multerUploads, datauri };

exports.PORT = 5000;
exports.mongoURI = "mongodb://localhost/estate";
exports.secret = "aa47f8215c6f30a0dcdb2a36a9f4168e";
