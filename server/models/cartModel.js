let mongoose=require("mongoose");
let cartSchema=new mongoose.Schema({
    dateCreated:Date,
    items:Object
})
module.exports=mongoose.model("cart",cartSchema);