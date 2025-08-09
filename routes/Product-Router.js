const express=require("express");
const { getAllProducts, createProducts, updateProduct, deleteProduct } = require("../controllers/Product-Controller");
const { productValidation, updateProductValidation } = require("../validators/productValidators");
const validateRequest = require("../middlewares/validateRequest");
const auth = require("../middlewares/authMidlleware");
const checkRole = require("../middlewares/checkRole");
const checkOwnerShip = require("../middlewares/checkOwnerShip");
const router=express.Router();



router.get("/products",getAllProducts)
router.post("/products",auth,checkRole(["admin"]),productValidation,validateRequest,createProducts);
router.put("/products",auth,checkRole(["admin"]),checkOwnerShip,updateProductValidation,validateRequest,updateProduct);
router.delete("/product",auth,checkRole(["admin"]),checkOwnerShip,deleteProduct);

module.exports=router