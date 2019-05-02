let express = require("express"),
    productsRouter = express.Router(),
    mongoose = require("mongoose");
  



 let productSchema = require("../models/productModel")


 productsRouter.post("/add",(request,response)=>{
   let product=new productSchema({
       title:request.body.title,
       price:request.body.price,
       category:request.body.category,
       imageUrl:request.body.imageUrl
   })
   product.save((err,result)=>{
      if(!err)
      response.send(result)
   })
})




productsRouter.get("/details/:id",(request,response)=>{
    productSchema.findOne({_id:request.params.id},(error,data)=>{
        if(!error)
        response.send(data);
    })
})// get product details



productsRouter.get("/search/:name",(request,response)=>{
    productSchema.find({name:request.params.name , isAccepted:true},(error,data)=>{
        if(!error){
            response.send(data);
        } else {
            console.log(error);
        }
    })
})// get product by name


productsRouter.get("/list", (request, response) => {
    

    //rathe than بدلا من
    //other than غير كذا
    //غير الواحدother the one
    productSchema.find({}, (error, data) => {
        if (!error)
        response.send(data);
   }); 
});// get all products


productsRouter.post("/update",(request,response)=>{
    //console.log("FROM THERE")
    //console.log(request.body)
    productSchema.updateOne({_id:request.body.productId},{
        title:request.body.product.title,
        price:request.body.product.price,
        category:request.body.product.category,
        imageUrl:request.body.product.imageUrl
    },(error,data)=>{
        if(!error){
            response.send(data);
        } else {
            console.log(error);
        }
    })
})

productsRouter.get("/delete/:id",(request,response)=>{
   productSchema.deleteOne({_id:request.params.id},(err,data)=>{
    if(!err)
    response.send(data)
   })
})


productsRouter.get("/productspercatergory/:categoryId",(request,response)=>{
    productSchema.find({_id:request.params.categoryId},(error,data)=>{
        if(!error)
        response.send(data);
    })
})// get products per category

productsRouter.get("/productspermoderator/:categoryId",(request,response)=>{
    productSchema.find({_id:request.params.categoryId,isAccepted:false},(error,data)=>{
        if(!error)
        response.send(data);
    })
})// get products per category


productsRouter.get("/productsperseller/:sellerId",(request,response)=>{
    productSchema.find({_id:request.params.sellerId},(error,data)=>{
        if(!error)
        response.send(data);
    })
})// get products per seller


productsRouter.get("/bestseller",(request,response)=>{
    let data = productSchema.aggregate([{$match : {isAccepted:true}}, {$sort: {salesCount:-1} }, {$limit:10} ],(err,data)=>{
        console.log(data)
        response.send(data);
    })
})// get best seller products


productsRouter.get("/newarrivals",(request,response)=>{
    productSchema.aggregate([{$match : {isAccepted:true}}, { $sort:{registerationDate:1} }, {$limit:1} ],(err,data)=>{
        console.log(data)
        response.send(data);
    })
})// get new arrivals products



module.exports = productsRouter;