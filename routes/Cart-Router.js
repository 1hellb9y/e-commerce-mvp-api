const express=require("express");
const { getCart, addToCart, updateCartItem, removeCartItem, clearCart } = require("../controllers/Cart-Controller");
const router=express.Router();

router.get("/cart",auth,getCart);
router.post("/cart",auth,addToCart);
router.put("/cart",auth,updateCartItem);
router.delete("/cart/:itemId",auth,removeCartItem);
router.delete("/cart",auth,clearCart)


module.exports=router;