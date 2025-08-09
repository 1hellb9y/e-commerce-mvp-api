const express=require("express");
const ConnectToDb = require("./config/connectToDb");
const app=express();
require("dotenv").config();
const port=process.env.PORT;
ConnectToDb();
const helemt=require("helmet");
const rateLimit=require("express-limit");
const cors=require("cors");
const xss=require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const UserRouter=require("./routes/User-Router");
const ProductRouter=require("./routes/Product-Router");
const CartRouter=require("./routes/Cart-Router");
const OrderRouter=require("./routes/Order-Router");

app.use(express.json());
app.use(helemt());
const loginLimitter=rateLimit({
    windowMs:15*60*1000,
    max:5,
    message:{
        success:false,
        message:"Too many login attempts, try again later",
    },
});
app.use("/login",loginLimitter);
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));
app.use(xss());
app.use(mongoSanitize());
app.use(hpp());
app.use(UserRouter);
app.use(ProductRouter);
app.use(CartRouter);
app.use(OrderRouter);

app.listen(port,()=>{console.log(`server is listening on port ${port}`)})