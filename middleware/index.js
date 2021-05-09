//all middleware goes here

var middlewareObj = {};

var Blog = require("../model/blog");

middlewareObj.checkBlogOwnership = function(req,res,next) {
    //is Logged in ?
    if(req.isAuthenticated()){
        Blog.findById(req.params.id,function(err,foundBlog){
            if(err){
                req.flash("error","Blog not found");
                res.redirect("back");
            } else {
                //does the user owns the blog?
                if(foundBlog.creator.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You donot have permission do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error","You need to be logged in for that");
        res.redirect("back");
    }
};

// middlewareObj.checkClapOwnership = function(req,res,next) {
//     //is Logged in ?
//     if(req.isAuthenticated()){
//         Clap.findById(req.params.comment_id,function(err,foundClap){
//             if(err){
//                 res.redirect("back");
//             } else {
//                 //does the user owns the clap?
//                 if(foundClap.author.id.equals(req.user._id)) {
//                     req.flash("error","You donot have permission do that");
//                     next();
//                 } else {
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         req.flash("error","You need to be logged in for that");
//         res.redirect("back");
//     }
// };

middlewareObj.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;