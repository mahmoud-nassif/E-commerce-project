let express=require('express'),
orderRouter=express.Router(),
mongoose=require('mongoose'),
orderSchema=require('../models/orderModel'),
jwt=require('jsonwebtoken')

orderRouter.post("/save",(req,res)=>{
    //console.log("order",req.body)
    let userId=req.body.userId//token before verifying
    let payload=jwt.verify(userId,"mean")
    //console.log("payload",payload)
     userId=payload._id;//userid after verifying
   // console.log("userid",userId)
    req.body.userId=userId//updating old token with userid
   // console.log("order",req.body)
   let order=new orderSchema(req.body)
   order.save((err,result)=>{
      // console.log("order saved",result)
      if (!err)
      res.send(result)
   })
})

orderRouter.get("/list/:userId",(req,res)=>{
   //let userId= req.params.userId
   orderSchema.find({userId:req.params.userId},(err,result)=>{
       if(!err)
       res.send(result)
   })
})



module.exports=orderRouter