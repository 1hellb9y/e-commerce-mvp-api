const Product=require("../models/Product-Model");

const checkOwnerShip=async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        res.status(400).json({
            msg:"cant found this product"
        })
    };
    if(product.createdBy.toString()!==req.user.id && req.user.role!=="admin"){
        return res.status(400).json({
            success:false,
            message:"not authorized to modify this product"
        });
    };
    next();
};
module.exports=checkOwnerShip