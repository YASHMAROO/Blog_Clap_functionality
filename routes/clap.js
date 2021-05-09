var express = require("express"),
    router = express.Router({mergeParams: true});

var Blog = require("../model/blog"),
    Clap = require("../model/clap");

var middleware = require("../middleware");

router.post('/:id',middleware.isLoggedIn ,function(req, res, next) {
    Blog.findById(req.params.id,function(err,blog){
        if(err)
        {
            console.log(err);
            res.redirect("/blogs");
        }
        else
        {
            let id= req.user._id;
            let index=-1;
            for(let i=0; i<blog.clap.length; i++) {
                if(blog.clap[i].id.equals(id)) {
                    console.log(i)
                    index= i;
                    break;
                }
            }
            if(index === -1) {
                let id= req.user._id;
                let username = req.user.username;
                let clap={id: id, name: username}
                blog.clap.push(clap);
                blog.save();
                req.flash("success","Succesfully claped")
                res.redirect("/blogs/"+blog._id)
            } else {
                blog.clap.splice(index, 1)
                blog.save()
                req.flash("success","Succesfully unclaped")
                res.redirect("/blogs/"+blog._id)
            }
        }
    })
});

module.exports=router;