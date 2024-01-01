let mongoose = require("mongoose");
var uuid = require("uuid");

var Admin = mongoose.Schema({
    Aid: {
        type: String,
        default: function geuid() { uuid; }
    },
    UFname: {
        type: String
    },
    ULname: {
        type: String
    },
    UEmail: {
        type: String,
        unique: true,
        required: [true, "Email can't be blank"],
        index: true
    },
    UPhone: {
        type: String
    },
    UPass: {
        type: String
    },
    Ustatus: {
        type: String,
        enum: ['Active', 'NotActive'],
        default: "Active",
        required: [true, "Select from List"]
    },
    U_added_date: {
        type: Date,
        default: Date.now
    },
    U_Last_log_inDate: {
        type: Date
    }
});

module.exports = Admin = mongoose.model('admin', Admin);