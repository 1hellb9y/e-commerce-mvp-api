const mongoose=require("mongoose");
const UserShema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name of the user is required"],
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:[true,"Email of the user is required"],
        unique:true,
        trim:true,
        lowercase:true,
        match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        min:6,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
})

const UserModel=mongoose.model("User",UserShema);
module.exports=UserModel