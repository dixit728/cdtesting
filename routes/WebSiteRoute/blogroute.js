//All require module
var express = require("express");
var router = express.Router();
var Blog = require("../../model/Blog");
const multer = require("multer");
var uid = require("uuid");
var OgData = require("../../config/Og.json");
var BlogData = require("../../controller/WebSite/blog");
var blogData = new BlogData();
var newFileName;

// for body parser and json data
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//Upload file using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var spath = "public/uploads/";
        cb(null, spath);
    },
    filename: (req, file, cb) => {
        file.originalname = uid.v4() + ".jpeg"
        newFileName = file.originalname;
        cb(null, file.originalname);
    }
});

//middleware to save file
const upload = multer({ storage });

//Route to blog
router.get(['/', "/index"], (req, res) => {
    blogData.getAllBlogs((blogs) => {
        if (blogs.Status == "err") {
            res.status(404).render('/error404.ejs', { title: "Error 404" });
        } else {
            OgData.title = "All Blogs";
            // console.log(OgData);
            res.status(200).render('../views/WebSite/Blog/list_blog.ejs', { title: "All Blogs - ED-Blog", data: blogs.data, Og: OgData });
        }
    });
});

//Route to add blog page
router.get('/AddNewBlog', (req, res) => {
    res.status(200).render('../views/WebSite/Blog/new_blog.ejs', { title: "Add New Blog - ED-Blog", Og: OgData });
});

router.post("/saveblog", upload.array('bimage'), (req, res) => {
    let data = {
        BlogTitle: req.body.btitle,
        BlogContent: req.body.bcontent,
        BlogCreatedBy: req.body.bcreatedby,
        BlogTags: req.body.btag,
        BlogImage: newFileName
    };
    var addblog = Blog(data);
    newFileName = "";
    addblog.save((err, savedata) => {
        if (err) {
            req.flash("error", "Some error  while saving data");
            res.status("200").redirect("/Blog/Addnewblog");
        } else {
            req.flash("success", "Data Saved");
            res.status(200).redirect("/Blog/Addnewblog");
        }
    });
});

router.get("/:id", (req, res) => {
    blogData.getBlogById(req.params.id, (blog) => {
        if (blog.Status == "err") {
            res.status(404).redirect("/error404");
        } else {
            OgData.title = blog.data.BlogTitle;
            // console.log(OgData);
            res.status(200).render('../views/WebSite/Blog/blog.ejs', { title: blog.data.BlogTitle + "- ED-Blog", data: blog.data, Og: OgData });
        }
    });
});



module.exports = router;