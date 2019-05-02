let mongoose=require('mongoose')
let orderSchema=new mongoose.Schema({
    userId:{
        type:String,
        ref:"user"
    },
    dateCreated:Date,
    shipping:Object,
    items:Array,
    totalPrice:Number,
    totalQuantity:Number
})
module.exports=mongoose.model("order",orderSchema)

      
     
     
     