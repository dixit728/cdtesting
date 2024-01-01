const { model } = require("mongoose");
var Blog = require("../../model/Blog");

class BlogData {
    async getAllBlogs(cb) {
        Blog.find({}, (err, Blogs) => {
            if (err) {
                return cb({ Status: "err", Msg: "Whle gett all blog", data: err });
            } else {
                return cb({ Status: "scc", Msg: "got all blog", data: Blogs });
            }
        });
    }

    async getBlogById(id, cb) {
        console.log(id);
        Blog.findById({ _id: id }, (err, blog) => {
            if (err) {
                return cb({ Status: "err", Msg: "Whle geting  blog by id", data: err });
            } else {
                console.log(blog);
                return cb({ Status: "scc", Msg: "goot all blog", data: blog });
            }
        });
    }

    async deleteBlogById(ProInfo, cb) {
        Blog.findOneAndDelete({ _id: ProInfo }, (err, blog) => {
            if (err) {
                return cb({ Status: "err", Msg: "error on deleting", data: err });
            } else if (blog == null) {
                return cb({ Status: "scc", Msg: "no data", data: blog });
            } else {
                return cb({ Status: "scc", Msg: "data deleted", data: blog });
            }
        });
    }

}
module.exports = BlogData;