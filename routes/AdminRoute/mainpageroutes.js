// All require modules
var express = require("express");
var router = express.Router();
var Admin = require("../../controller/Admin/AdminController");
var admin = new Admin();
var User = require("../../controller/WebSite/UserController")
var user = new User();


var BlogData = require("../../controller/WebSite/blog");
const multer = require("multer");
const uuid = require("uuid");
var imagesPath = [];

//to upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var soratepath = 'Public/uploads/';
        cb(null, soratepath);
    },
    filename: (req, file, cb) => {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        //   file.originalname = uuid.v4() + "_" + file.originalname;
        file.originalname = uuid.v4() + "." + extension;

        const { originalname } = file;
        imagesPath.push(originalname);
        cb(null, originalname);
    }
});

// Route to admin sign up and sign in
{
    router.get(["/","/Add", "/AdminSignup"], (req, res) => {
        return res.status(200).render("../views/Admin/mainpages/signup.ejs", { title: "Sign up - ED-Blog" });
    });

    router.post("/Add", (req, res) => {
        admin.SaveAdmin(req.body, (CbData) => {
            if (CbData.Status == "err") {
                req.flash("Error", CbData.Msg);
            } else {
                req.flash("Success", "Admin Registered Successfully.");
                return res.status(200).redirect("/Admin/ShowAllAdmin");
            }
        });
    });
}

// Route to show all admin
router.get("/ShowAllAdmin", (req, res) => {
    admin.GetAllAdmin((CbData) => {
        if (CbData == "err") {
            req.flash("Error", CbData.Msg);
            return res.status(200).redirect("/Admin/");
        } else {
            return res.status(200).render("../views/Admin/mainpages/ShowAllAdmin.ejs", { title: "Show All Admin - ED-Blog", data: CbData.data });
        }
    });
});

// Route to All User
router.get(["/ShowAllUser"], (req, res) => {
    user.getAllUser((CbData) => {
        if (CbData.Status == "err") {
            req.flash("error", CbData.Msg);
            return res.status(200).redirect("/Admin/");
        } else {
            return res.status(200).render("../views/Admin/mainpages/ShowAllUserr.ejs", { title: "All User - Appa", data: CbData.data });
        }
    });
});



// Route for Blog Page and Blog Delete
{
    router.get("/All Blog", (req, res) => {
        return res.status(200).render();
    });
}


// Route to logout
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    req.flash("success", "Logout Done");
    res.status(200).redirect("/login");
});

module.exports = router;