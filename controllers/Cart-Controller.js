const { Expose } = require("class-transformer");
const Cart=require("../models/Cart-Model");
const Product=require("../models/Product-Model");
const asyncHandler = require("../utils/asyncHandler");
exports.addToCart=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    const {productId,quantity}=req.body;
    const product=await Product.findById(productId);
    if(!product){
        return res.status(400).json({
            msg:"cant found this product"
        })
    };
    let cart =await Cart.findOne({user:userId});
    if(!cart){
        cart =new Cart({
            user:userId,
            items:[{product:productId,quantity,price:product.price}]
        })
    }else{
        const itemIndex=cart.items.findIndex(
            item=>item.product.toString()===productId
        );
        if(itemIndex>-1){
            cart.items[itemIndex].quantity+=quantity;
        }else{
            cart.items.push({product:productId,qunatity:quantity,price:product.price});
        }
        await cart.save();
        res.status(200).json(cart)
    };
})
exports.getCart=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    const cart=await Cart.findOne({user:userId}).populate("items.product");
    if(!cart){
        return res.status(400).json({itmes:[]})
    }
    return res.status(200).json(cart);
});

exports.updateCartItem=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    const {itemId,quantity}=req.body;
    const cart=await Cart.findOne({user:userId});
    if(!cart){
        return res.status(400).json({message:"Cart not found"})
    }
    const item=cart.items.id(itemId);
    if(!item){
        return res.status(400).json({msg:"item not found"})
    };
    item.quantity+=quantity;
    if(item.quantity<=0){
        cart.items.id(itemId).remove();
    };
    await cart.save();
    return res.status(200).json(cart);
});
exports.removeCartItem=asyncHandler(async(req,res)=>{
    const userId=req.user.id
    const {itemId}=req.params;
    const cart=await Cart.findOne({user:userId});
    if(!cart){
        return res.status(400).json({msg:"Cart not found"})
    };
    cart.items.id(itemId).remove();
    await cart.save();
    return res.status(200).json(cart);

})
exports.clearCart=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    const cart=await Cart.findOne({user:userId});
    if(!cart){
        return res.status(400).json({msg:"cart not found"})
    };
    cart.items=[];
    await cart.save();
    return res.status(200).json(cart);
});
