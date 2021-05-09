var express=require("express"),
    router=express.Router(),
    passport=require("passport");

var User=require("../model/user");
var Blog=require("../model/blog");
var middleware = require("../middleware");

//Landing Page
router.get("/",function(req,res){
    Blog.find({},function(err,allBlogs){
        if(err) {
            console.log(err);
        } else {
            res.render("blogs/index.ejs",{blogs:allBlogs});
        }
    }).sort({created: 'desc'});     
});

// ============
//AUTH ROUTES
// ============

//register route
router.get("/register",function(req,res){
    res.render("register.ejs");
});

//handle signup logic
router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser , req.body.password , function(err,user){
        if(err)
        {
            req.flash("error",err.message);
            console.log(err);
            return res.render("register.ejs");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to BlogsWebsite " + user.username);
            res.redirect("/blogs");
        })
    })
});

//login route
router.get("/login",function(req,res){
    res.render("login.ejs");
});

//handling login logic
router.post("/login",passport.authenticate("local",{
    successRedirect:"/blogs",
    failureredirect:"/login"
    }),function(req,res){
});

//logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect("/blogs");
});

module.exports=router;