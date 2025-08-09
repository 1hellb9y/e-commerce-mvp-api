const express=require("express");
const auth = require("../middlewares/authMidlleware");
const { getMyOrders, createOrder, updateOrderStatus } = require("../controllers/Order-Controller");
const checkRole = require("../middlewares/checkRole");
const router=express.Router();

router.get("/order",auth,getMyOrders);
router.post("/order",auth,createOrder);
router.put("/order/:id",auth,checkRole(["admin"]),updateOrderStatus);



module.exports=router