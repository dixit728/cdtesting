module.exports = function(jwrt) {
    var jwt = require('jsonwebtoken');
    var out = {};

    //User Validationd
    {
        out.checkcookie = function(req, res, next) {
            var is_user = res.locals.is_User;
            if (is_user == true) {
                next();
            } else {
                req.flash("error", "Log In First");
                return res.status(200).redirect("/User/LogIn");
            }
        };

        out.checkuserexicte = function(req, res, next) {
            var is_user = res.locals.is_User;
            if (is_user == false) {
                next();
            } else {
                req.flash("error", "First Log out");
                return res.status(200).redirect("../User/logout");
            }
        };

        out.authenticateToken = (req, res, next) => {
            try {
                var output1 = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);
                var output2 = jwt.verify(res.locals.User, process.env.TOKEN_SECRET);
                if (output1.UID === output2.UID) {
                    next();
                } else {
                    req.flash("error", "Log In First");
                    return res.status(200).redirect("/User/login");
                }
            } catch (E) {
                return res.status(200).redirect("/User/logout");
            }
        };

        out.UserID = (req, res, next) => {
            try {
                var output = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);
                return output;
            } catch (E) {
                return "Error";
            }
        }
    }

    //Admin Validation
    {
        out.checkcookieAdmin = function(req, res, next) {
            var is_Admin = res.locals.is_Admin;
            if (is_Admin == true) {
                next();
            } else {
                req.flash("error", "Log In First");
                res.status(200).redirect("/Admin/login");
            }
        };

        out.checkadminexicte = function(req, res, next) {
            var is_Admin = res.locals.is_Admin;
            if (is_Admin == false) {
                next();
            } else {
                req.flash("error", "First Log out");
                res.status(200).redirect("/Admin/login");
            }
        };

        out.authenticateAdminToken = (req, res, next) => {
            try {
                var output1 = jwt.verify(req.cookies.atoken, process.env.TOKEN_SECRET);
                var output2 = jwt.verify(res.locals.admin, process.env.TOKEN_SECRET);
                if (output1.UD === output2.UD) {
                    next();
                } else {
                    req.flash("error", "Log In First");
                    res.status(200).redirect("/Admin/login");
                }
            } catch (E) {
                req.flash("error", "Log In First");
                res.status(200).redirect("/Admin/login");
            }
        };

    }
    return out;
};