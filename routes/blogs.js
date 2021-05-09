var express=require("express"),
    router=express.Router();

var Blog=require("../model/blog");

var middleware = require("../middleware");

// INDEX- show all blog
router.get("/",function(req,res){
    Blog.find({},function(err,allBlogs){
        if(err) {
            console.log(err);
        } else {
            res.render("blogs/index.ejs",{blogs:allBlogs});
        }
    }).sort({created: 'desc'});     
});

// CREATE - creating a new blog
router.post("/",middleware.isLoggedIn ,function(req,res){
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var creator = {
        id: req.user._id,
        name: req.user.username
    };
    var created = Date.now();
    var newBlog={title:title, image:image , body: body, creator: creator, created: created};
    Blog.create(newBlog,function(err,newBlog){
        if(err) {
            console.log(err);
        } else {
            //REDIRECTING TO blog PAGES
            res.redirect("/blogs");
        }
    });
});

//NEW - displaying the form to fill the new blog
router.get("/new", middleware.isLoggedIn ,function(req,res){
    res.render("blogs/newblog.ejs");
});

//SHOW- show more info about blog
router.get("/:id",function(req,res){
    //finding the blogwith given id
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err) {
            console.log(err);
        } else {
            //rendering show template with that blog
            let index=-1,id=0;
            if(req.user === undefined) {
                id=0;
            } else {
                id = req.user_id;
            }
            for(let i=0; i<foundBlog.clap.length; i++) {
                if(foundBlog.clap[i].id.equals(id)) {
                    index= i;
                    break;
                }
            }
            res.render("blogs/show.ejs",{data: {blog: foundBlog, index: index}});
        }
    });
});

//DESTROY blog ROUTE
router.delete("/:id",middleware.checkBlogOwnership, function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err) {
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs")
        }
    })
});

module.exports=router;