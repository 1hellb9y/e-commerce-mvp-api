const mongoose=require("mongoose");
const Product=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title of the product is required"],
    },
    description:{
        type:String,
        required:[true,"Description of the product is required"],
    },
    price:{
        type:Number,
        required:[true,"Price is required"],
        min:0
    },
    category:{
        type:String,
    },
    stock:{
        type:Number,
        default:0
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
});
const ProductModel=mongoose.model("Product",Product);
module.exports=ProductModel
