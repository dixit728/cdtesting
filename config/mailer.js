const nodemailer = require("nodemailer");
let config = require("./config.json");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 587, false for other ports
    auth: {
        user: config.uemailid, // generated ethereal user
        pass: config.upass, // generated ethereal password
    },
});
module.exports = transporter;