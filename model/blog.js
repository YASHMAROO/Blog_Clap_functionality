mongoose=require("mongoose");

//Setting Schema
blogScehma=new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
    creator:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name:String
    },
    clap: [
        {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            name:String
        }
    ]
});

module.exports=mongoose.model("Blog",blogScehma);