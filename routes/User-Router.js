const express=require("express");
const { reigsterUser, loginUser, getMe } = require("../controllers/User-Controller");
const auth = require("../middlewares/authMidlleware");
const { registerValidation, loginValidation } = require("../validators/userValidator");
const validateRequest = require("../middlewares/validateRequest");
const router=express.Router();

router.post("/register",registerValidation,validateRequest,reigsterUser);
router.post("/login",loginValidation,validateRequest,loginUser);
router.get("/me",auth,getMe)



module.exports=router