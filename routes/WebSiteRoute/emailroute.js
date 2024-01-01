const express = require("express");
var router = express.Router();
let config = require("../../config/config.json");
let transporter = require("../../config/mailer");
let ejs = require("ejs");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//route for sending emails
router.post("/sendemail", (req, res) => {
    console.log(req.body);
    let data = {
        uname: req.body.uname,
        uemail: req.body.uemail,
        uphone: req.body.uphoneno,
        umsg: req.body.message,
    };
    ejs.renderFile("./views/WebSite/email/thanksforcontact.ejs", { udata: data }, async(err, tfile) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(tfile);
            let info = await transporter.sendMail({
                from: config.uemailid, // sender address
                to: data.uemail, // list of receivers
                subject: "Thank you for contacting us", // Subject line
                text: "Hello world?", // plain text body
                html: tfile, // html body
            });
            res.status(200).redirect("/");
        }
    });
});

router.get("/test", (req, res) => {
    res.render("../views/email/thanksforcontact.ejs");
});

module.exports = router;