const Order=require("../models/Order-Model");
const Cart=require("../models/Cart-Model");
const asyncHandler = require("../utils/asyncHandler");

exports.createOrder=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    const cart=await Cart.findOne({user:userId}).populate("items.product");
    if(!cart || cart.length===0){
        return res.status(200).json({
            msg:"Cart is empty"
        })
    };
    const totalAmount=cart.items.reduce((sum,item)=>sum+item.price*item.quantity,0);


    const order=new Order({
        user:userId,
        items:cart.items.map(item=>({
            product:item.product._id,
            quantity:item.quantity,
            price:item.price,
        })),
        totalAmount,
        shippingAddress:req.body.shippingAddress,
        paymentMethod:req.body.paymentMethod || "cash",
    });
    await order.save();
    cart.items=[];
    await cart.save();
    res.status(200).json(
        order
    );
});

exports.getMyOrders=asyncHandler(async(req,res)=>{
    const userId=req.user.id
    const orders=await Order.find({user:userId}).sort({createdAt:-1});
    res.status(200).json(orders);
})

exports.updateOrderStatus=asyncHandler(async(req,res)=>{
    const orderId=req.params;
    const status=req.body;
    const order=await Order.findById(orderId);
    if(!order){
        return res.status(400).json({
            msg:"Order not found"
        })
    };
    order.status=status;
    await order.save();
    res.status(200).json({
        msg:"order status updated",
        order:order.status
    });

})