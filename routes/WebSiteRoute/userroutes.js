//All require module
var express = require("express");
var router = express.Router();
var User = require("../../model/User");
var UserData = require("../../controller/WebSite/UserController");
var userdata = new UserData(); //Constructor of UserData
var JWT = require("../../controller/WebSite/jwt");
var jwt = new JWT();
var usermiddleware = require("../../middleware/userverification")(jwt);
var OgData = require("../../config/Og.json");

checkuserexitce = function(req, res, next) {
    var token = req.cookies.token;
    if (!token) {
        next();
    } else {
        req.flash("error", "User Allready log in");
        res.status(200).render('../views/WebSite/mainpages/index.ejs', { title: "Home - ED-Blog", Og: OgData, data: blogs.data });
    }
};

chekusernotexitcs = function(req, res, next) {
    var token = req.cookies.token;
    if (!token) {
        req.flash("error", "Please login");
        res.status(200).render('../views/WebSite/user/login.ejs', { title: "Login - ED-Blog", Og: OgData, data: blogs.data });
    } else {
        next();
    }
};

//Route to login page
{
    router.get('/login', checkuserexitce, (req, res) => {
        OgData.title = "User Login";
        return res.status(200).render('../views/WebSite/user/login.ejs', { title: "Login - ED-Blog", Og: OgData });
    });

    //Route to check wether user exist or not
    router.post("/login", (req, res) => {
        // console.log(req.body);
        User.findOne({ Uemail: req.body.uid, Upass: req.body.upass }, (err, data) => {
            if (err) {
                req.flash("error", "Some error at server");
                return res.status(200).redirect("/user/signup");
            } else if (!data) {
                req.flash("error", "User id and password is wrong");
                return res.status(200).redirect("/user/login");
            } else {
                userdata = {
                    name: data.Ufname + " " + data.Ulname,
                    email: data.Uemail,
                    ID: data.UID
                };
                var token = jwt.generateAccessToken({ UID: userdata.ID });
                res.cookie("token", token, { maxAge: 60 * 60 * 100000 });
                res.cookie("UserName", userdata.name, { maxAge: 60 * 60 * 100000 });
                return res.status(200).redirect("/");
            }
        });
    });

}

// Route to signup
{
    //Route to sign up page
    router.get('/signup', checkuserexitce, (req, res) => {
        OgData.title = "User Sign up"
            // console.log(OgData);
        return res.status(200).render('../views/WebSite/user/signup.ejs', { title: "Sign up - ED-Blog", Og: OgData });
    });

    //Route to save user details
    router.post("/SaveUser", (req, res) => {
        userdata.SaveUser(req.body, (CbData) => {
            if (CbData.Status == "err") {
                req.flash("error", "Data Not Saved");
                return res.status(200).redirect("/profile");
            } else {
                req.flash("sucess", "Data saved successfully.");
                return res.status(200).redirect("/user/login");
            }
        });
    });
}

router.get(["/profile"], usermiddleware.authenticateToken, (req, res) => {
    let udata = jwt.getUID(res.locals.User);
    console.log("🚀 ~ file: userroutes.js ~ line 91 ~ router.get ~ User", udata);
    User.findOne({ UID: udata.UID }, (err, fdata) => {
        OgData.title = "User Profile";
        OgData.description = "Here user can view his or her details.";
        return res.status(200).render("../views/WebSite/user/userprofile.ejs", { title: "Profile - ED-Blog", data: fdata, Og: OgData });
    });
    // userdata.CheckUserByUID1(udata);
    // // userdata.CheckUserByUID(udata.UID, (info) => {
    // //     if (info.Status == "err") {
    // //         req.flash("error", "Please Login Again");
    // //         return res.status(200).redirect("/User/Login");
    // //     } else {
    // //         OgData.title = "User Profile";
    // //         OgData.description = "Here user can view his or her details.";
    // //         return res.status(200).render("../views/WebSite/user/userprofile.ejs", { title: "Profile - ED-Blog", data: info.data, Og: OgData });
    // //     }
    // // });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    req.flash("success", "Logout Done");
    return res.status(200).redirect("/user/login");
});

module.exports = router;