let express=require("express"),
    app=express(); 
    bodyparser=require("body-parser"),
    mongoose=require("mongoose"),
    passport = require("passport"),
    flash=require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./model/user");

mongoose.connect("mongodb://localhost/blog_app",{useNewUrlParser: true});
let blogRoutes = require("./routes/blogs"),
    clapRoutes = require("./routes/clap"),
    authRoutes = require("./routes/index");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret:"Tony Stark has a heart",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Blog.create({
//     name: "Rescued Animals",
//     image: "https://www.goodnet.org/photos/620x0/30012_hd.jpg",
//     body: "There are many animals rescued nowadays by the troops from different areas"
// })

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",authRoutes);
app.use("/blogs", blogRoutes);
app.use("/blogs", clapRoutes);
let port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Server started at : http://localhost:" + port + "/");
})