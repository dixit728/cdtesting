//All require module
var express = require("express");
var router = express.Router();
var { v4: uuid4 } = require("uuid");
var BlogData = require("../../controller/WebSite/blog");
var blogData = new BlogData();
var OgData = require("../../config/Og.json");

//Route to Home page
router.get(['/', '/index'], (req, res) => {
    blogData.getAllBlogs((blogs) => {
        if (blogs.Status == "err") {
            return res.status(404).render('../views/WebSite/mainpages/error404.ejs', { title: "Error 404" });
        } else {
            OgData.title = "Home";
            // console.log(OgData);
            return res.status(200).render('../views/WebSite/mainpages/index.ejs', { title: "Home - ED-Blog", data: blogs.data, Og: OgData });
        }
    });

});

//Route to Contact us
router.get('/Contactus', (req, res) => {
    OgData.title = "Contact us";
    // console.log(OgData);
    return res.status(200).render('../views/WebSite/mainpages/contact.ejs', { title: "Contact us - ED-Blog", Og: OgData });
});

//Route to About us
router.get('/Aboutus', (req, res) => {
    OgData.title = "About us";
    // console.log(OgData);
    return res.status(200).render('../views/WebSite/mainpages/about.ejs', { title: "About us - ED-Blog", Og: OgData });
});

module.exports = router;