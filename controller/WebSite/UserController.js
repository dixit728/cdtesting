var User = require('../../model/User');
var uuid = require('uuid');

class UserData {
    // Save the user details
    async SaveUser(UserInfo, cb) {
        let user = {};
        user.UID = uuid.v4();
        user.Ufname = UserInfo.ufname;
        user.Ulname = UserInfo.ulname;
        user.Uemail = UserInfo.uemail;
        user.Upass = UserInfo.upass;
        let userModel = new User(user);
        await userModel.save((err, done) => {
            if (err) {
                return cb({ Status: "err", Msg: "User Already Exist", data: err });
            } else {
                return cb({ Status: "suc", Meassage: "User Detail Saved", data: done });
            }
        });
    }

    // To get all user
    async getAllUser(cb) {
        User.find({}, (err, users) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (users == null) {
                return cb({ Status: "err", Msg: "User does not Exist", data: err });
            } else {
                let users2 = JSON.stringify(users);
                let users1 = JSON.parse(users2);
                delete users1.UPass;
                delete users1.Ustatus;
                delete users1.U_added_date;
                delete users1._id;
                return cb({ Status: "suc", Msg: "User found", data: users1 });
            }
        });
    }

    // user user with udi
    async CheckUserByUID1(UserInfo, cb) {
        await User.findOne({ UID: UserInfo }, (err, user) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error checking  Data", data: err });
            } else if (user == null) {
                return cb({ Status: "err", Msg: "User Does not Exist", data: err });
            } else {
                let user2 = JSON.stringify(user);
                let user1 = JSON.parse(user2);
                delete user1.UPass;
                delete user1.Ustatus;
                delete user1.U_added_date;
                delete user1._id;
                return cb({ Status: "suc", Msg: "User found", data: user1 });
            }
        });
    }
}

module.exports = UserData;