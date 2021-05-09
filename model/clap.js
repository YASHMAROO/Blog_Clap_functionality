mongoose=require("mongoose");

var clapSchema=new mongoose.Schema({
    flag:false,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports=mongoose.model("Clap",clapSchema);