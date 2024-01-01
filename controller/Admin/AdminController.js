// All require modules
var Admin = require("../../model/Admin");
var connectDBDev = require("../../config/connection");
var uuid = require("uuid");

class AdminData {
    //Save the admin
    async SaveAdmin(adminInfo, cb) {
        let admin = {};
        admin.UID = uuid.v4();
        // Field name of module = Field name of form input name
        admin.UFname = adminInfo.Ufname;
        admin.ULName = adminInfo.ulname;
        admin.UEmail = adminInfo.uemail;
        admin.UPhone = adminInfo.uphone;
        admin.UPass = adminInfo.upass
        let adminModel = new Admin(admin);
        await adminModel.save((err, done) => {
            if (err) {
                return cb({ Status: "err", Msg: "Admin Allready Exist", data: err });
            } else {
                return cb({ Status: "suc", Msg: "Admin Detail Saved", data: done });
            }
        });
    }

    //Check Admin in Database
    async CheckAdmin(AdminInfo, cb) {
        Admin.findOne({ UEmail: AdminInfo.Uemail, UPass: AdminInfo.Upass, Ustatus: "Active" }, (err, admin) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (admin == null) {
                return cb({ Status: "err", Msg: "Does not Exist", data: err });
            } else {
                let admin2 = JSON.stringify(admin);
                let admin1 = JSON.parse(admin2);
                delete admin1.UPass;
                delete admin1.Ustatus;
                delete admin1.U_added_date;
                delete admin1._id;
                return cb({ Status: "suc", Msg: "User found", data: admin1 });
            }
        });
    }

    //Check Admin in Database
    async GetAllAdmin(cb) {
        Admin.find({}, (err, admin) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (admin == null) {
                return cb({ Status: "err", Msg: "Does not Exist", data: err });
            } else {
                let admin2 = JSON.stringify(admin);
                let admin1 = JSON.parse(admin2);
                delete admin1.UPass;
                delete admin1.Ustatus;
                delete admin1.U_added_date;
                delete admin1._id;
                return cb({ Status: "suc", Msg: "User found", data: admin1 });
            }
        });
    }
}

module.exports = AdminData