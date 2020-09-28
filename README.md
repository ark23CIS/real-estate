# real-estate
## Installation
1. ### npm install.
2. ### Create .env file
3. ### Download mongoDB if it's necessary and then run it.
4. ### npm run start
### add .env to the project with variables for getting photos from cloudinary and confirmation email:
  1. CLOUDINARY_CLOUD_NAME=
  2. CLOUDINARY_API_KEY=
  3. CLOUDINARY_API_SECRET=
  4. PORT=5000
  5. MONGOURI=mongodb://localhost/estate
  6. SECRET=
  7. NODEMAILER_USER=
  8. NODEMAILER_PASS=
  9. NODEMAILER_HOST=
  10. NODEMAILER_PORT=
***
CLOUDINARY params you can get after registration on the cloudinary.com.
To run email confirmation you need to enter gmail data in NODEMAILER_USER and NODEMAILER_PASS
and only then follow the link https://support.google.com/mail/answer/7126229?hl=ru and pass
data in NODEMAILER_HOST and NODEMAILER_PORT

