// All requrire modules
var express = require("express");
var connectDBDev = require("../../config/connection");

class Blog {
    async deleteBlogById(ProInfo, cb) {
        Product.findOneAndDelete({ Pid: ProInfo }, (err, blog) => {
            if (err) {
                return cb({ Status: "err", Msg: "error on deleting", data: err });
            } else if (blog == null) {
                return cb({ Status: "scc", Msg: "no data", data: product });
            } else {
                return cb({ Status: "scc", Msg: "data deleted", data: product });
            }
        });
    }
}

module.exports = router;