const mongoose=require("mongoose");
const Cart=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true,
            },
            quantity:{
                type:Number,
                default:1,
                min:1
            },
            price:{
                type:Number,
                required:true
            },

        }
    ]
},{timestamps:true});
const CartModel=mongoose.model("Cart",Cart);
module.exports=CartModel;