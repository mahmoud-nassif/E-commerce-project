let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    
    title: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    imageUrl: {
        type: String 
    }
})
 
module.exports=mongoose.model("product",productSchema);