let express = require("express"),
    userRouter = express.Router(),
    mongoose = require("mongoose"),
    jwt= require('jsonwebtoken');

let userSchema = require('../models/userModel')

let users=[new userSchema({email:"mahmoudnassifptp39@gmail.com",password:"123"}),
new userSchema({email:"test@test.com",password:"456"})];

// userRouter.get("/create",(request,response)=>{
//         users.forEach((user)=>{
//             console.log(user)
//             let counter=0;
//             user.save((error,data)=>{
//                 if(!error){
//                     counter++
//                     if(counter==2)
//                     {
//                       console.log("done")
//                     }
//                    // response.send(data);
                   
//                 }
//                 else {
//                     console.log(error)
//                 }
//             })
//         })
//     })

userRouter.post("/signin",(req,res)=>{
    //console.log("body",req.body)
    userSchema.findOne({email:req.body.email,password:req.body.password},(err,result)=>{
        if(result)
        {
             //generate token and send it to client
            let payload={_id:result._id,email:result.email,password:result.password,isAdmin:result.isAdmin}
            let token=jwt.sign(payload,"mean")
            console.log("from result",token)
            res.send({token})
        }
        else
        { //if result then err==null
           // console.log("from err",err)
            res.send({msg:"invalid"})
        }
       
    })
})

// userRouter.post("/isadmin",(req,res)=>{
//     let token =req.body.token
//     console.log("token",token)
//      let payload=jwt.verify(token,"mean")
//      console.log("payload",payload)
//      res.send({payload})
// })

userRouter.post("/getUserName",(req,res)=>{
    let token=req.body.token
    let payload=jwt.verify(token,"mean")
    userSchema.findOne({_id:payload._id},(err,result)=>{
        if(!err)
        res.send(result)
    })
})

 module.exports=userRouter;