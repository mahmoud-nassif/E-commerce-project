let express = require('express'),
    bodyParser = require('body-parser'),
    cookie_parser = require('cookie-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session);
    categoryRouter=require("./routers/category");
    productsRouter=require("./routers/product")
    cartRouter=require("./routers/cart")
    userRouter=require('./routers/user')
    orderRouter=require('./routers/order')

  

mongoose.connect("mongodb://localhost:27017/shop");

//open server
let server = express();
server.use(
    session({secret:"be3ly",
   // resave:false,
    //saveUninitialized:false,
    store:new mongoStore({mongooseConnection:mongoose.connection}),
    cookie:{maxAge:3*60*1000}
}),(req,res,next)=>{
    console.log("one session created")
    //console.log(req.session)
    res.locals.session=req.session
    next()
})

server.use(bodyParser.json());
server.use(bodyParser.urlencoded());
server.use(cookie_parser());


//cors allowance
server.use(cors())

server.use("/category",categoryRouter);
server.use("/product",productsRouter);
server.use("/cart",cartRouter)
server.use("/user",userRouter)
server.use('/order',orderRouter)


server.use((request, response) => {
    response.status(404).send("Not Found");
});


//port//
server.listen(8080, () => {
    console.log('listening..........')
});