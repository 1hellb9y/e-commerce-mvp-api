const User=require("../models/User-Model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const SECRET_KEY=process.env.SECRET_KEY;


exports.reigsterUser=asyncHandler(async(req,res)=>{
    const{name ,email,password}=req.body;
    if(!name || !email ||!password){
        return res.status(400).json({msg:"some fields are required"});
    };
    const existUser=await User.findOne({email});
    if(existUser){
        return res.status(400).json({msg:"this user is already exist"})
    };
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({
        name,
        email,
        password:hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({msg:"new user register",user:newUser.name})
});

exports.loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || ! password){
        return res.status(400).json({msg:"some fields are required"});
    };
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({msg:"cannot found this user",email})
    };
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({msg:"password incorrect"});
    };
    const payload={
        id:user._id,
        name:user.name,
        role:user.role
    }
    const token=jwt.sign(payload,SECRET_KEY,{expiresIn:"7d"});

    return res.status(200).json({msg:"you have loggin in successfully",token});
});

exports.getMe=asyncHandler(async(req,res)=>{
    const me =req.user;
    return res.status(200).json(me);
})



