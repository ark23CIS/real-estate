require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const Datauri = require("datauri/parser");
const path = require("path");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

let mailOptions = (from, to, subject, text) => ({
  from,
  to,
  subject,
  text,
});

const cloudinaryConfig = (_, __, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};

const multerStorage = multer.memoryStorage();
const multerUploads = multer({ multerStorage });

const dUri = new Datauri();

const datauri = (req) =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

exports.nodemailer = { transporter, mailOptions };
exports.multer = { multerUploads, datauri };
exports.cloudinary = { cloudinaryConfig, uploader: cloudinary.uploader };
exports.PORT = process.env.PORT || 5000;
exports.mongoURI = process.env.MONGOURI;
exports.secret = process.env.SECRET;
