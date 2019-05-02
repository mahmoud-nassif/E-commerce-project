let express = require("express"),
    cartRouter = express.Router()
    mongoose = require("mongoose");

let cartSchema = require('../models/cartModel')

cartRouter.get("/create",(req,res)=>{
   let cart=new cartSchema({
       dateCreated:new Date().getTime(),
      // items:{"":""}
   })
   cart.save((err,result)=>{
     if(!err)
     res.send(result)
   })
})

cartRouter.get("/get/:id",(req,res)=>{
    cartSchema.findById(req.params.id,(err,result)=>{
        if(!err)
        res.send(result)
    })
})

cartRouter.post("/add",(req,res)=>{
    console.log("api hitted")
    console.log(req.body)
    let Cart=req.body.Cart
    let product=req.body.product
    Cart.items=Cart.items||{};
    if(!Cart.items[product._id])
    {
     Cart.items[product._id]={product:product,quantity:0}
    }
    Cart.items[product._id].quantity++
    cartSchema.updateOne({_id:Cart._id},{$set:{items:Cart.items}},(err,result)=>{
        console.log("cart updated")
       // console.log(Cart)
        res.send(Cart)
    })
    
})
cartRouter.post("/remove",(req,res)=>{
    console.log("from remove api")
    //console.log(req.body)
    let Cart=req.body.Cart;
    let product=req.body.product;
   // console.log(Cart.items)
   Cart.items[product._id].quantity--;
    if(Cart.items[product._id].quantity==0)
    {
        console.log("before delete")
        //console.log(Cart)
        delete Cart.items[product._id]
        console.log("after delete")
        //console.log(Cart)
        cartSchema.updateOne({_id:Cart._id},{$set:{items:Cart.items}},(err,result)=>{
            res.send(Cart)
        })
    }
    else
    {
       cartSchema.updateOne({_id:Cart._id},{$set:{items:Cart.items}},(err,result)=>{
       res.send(Cart)
      })
    } 
})
cartRouter.post("/clear",(req,res)=>{
  let cartId=req.body.cartId;
  //console.log("clear",cart)
  cartSchema.updateOne({_id:cartId},{$set:{items:{}}},(err,result)=>{
    cartSchema.findOne({_id:cartId},(err,cart)=>{
        res.send(cart)  
    })
    
  })
})
module.exports=cartRouter;