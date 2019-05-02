let express = require("express"),
    categoryRouter = express.Router(),
    path = require("path"),
    mongoose = require("mongoose");

let categorySchema = require('../models/categoryModel')

let categories=[new categorySchema({name:"vegetables"}),
new categorySchema({name:"fruits"}),new categorySchema({name:"breads"})];

categoryRouter.get("/list",(request,response)=>{
    categorySchema.find({},(error,data)=>{
        if(!error){
            response.send(data);
            //console.log(data)
        }
        else {
            console.log(error)
        }
    })
})
// categoryRouter.get("/create",(request,response)=>{
//     categories.forEach((category)=>{
//         console.log(category)
//         let counter=0;
//         category.save((error,data)=>{
//             if(!error){
//                 counter++
//                 if(counter==3)
//                 {
//                   console.log("done")
//                 }
//                // response.send(data);
               
//             }
//             else {
//                 console.log(error)
//             }
//         })
//     })
// })

module.exports = categoryRouter;