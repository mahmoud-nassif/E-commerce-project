let mongoose=require("mongoose");
let userSchema=new mongoose.Schema({
    email:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model("user",userSchema);