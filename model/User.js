let mongoose = require("mongoose");
const { stringify } = require("uuid");

var User = mongoose.Schema({
    UID: {
        type: String,
        unique: true,
        required: [true, "ID can't be blank"],
        index: true
    },
    Ufname: {
        type: String
    },
    Ulname: {
        type: String
    },
    Uemail: {
        type: String,
        unique: true,
        required: [true, "Email can't be blank"],
        index: true
    },
    Uphone: {
        type: Number,
        default: 1234567890
    },
    Upass: {
        type: String
    },
    UregistrationDate: {
        type: Date,
        default: Date.now
    },
    Ustatus: {
        type: String,
        enum: ['Active', 'NotActive'],
        default: "Active",
        required: [true, "Select from List"]
    }
});

module.exports = User = mongoose.model("User", User);