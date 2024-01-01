let mongoose = require("mongoose");
var uuid = require("uuid");

var Blog = mongoose.Schema({
    Bid: {
        type: String,
        default: function geuid() { uuid; }
    },
    BlogTitle: {
        type: String
    },
    BlogCreatedDate: {
        type: Date,
        default: Date.now
    },
    BlogImage: {
        type: String
    },
    BlogContent: {
        type: String
    },
    BlogCreatedBy: {
        type: String
    },
    BlogTags: {
        type: String
    },
    BlogStatus: {
        type: String,
        default: "Working"
    }
});


module.exports = Blog = mongoose.model("Blog", Blog);