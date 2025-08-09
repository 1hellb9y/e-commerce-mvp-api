const { max } = require("class-validator");
const Product=require("../models/Product-Model");
const asyncHandler = require("../utils/asyncHandler");

exports.getAllProducts=asyncHandler(async(req,res)=>{
    const {category,minPrice,maxPrice,inStock,sort='-createdAt',limit=10,page=1,search}=req.query;
    const query={};
    if(category)query.category=category;
    if(inStock!==undefined)query.inStock=inStock==='true';
    if(minPrice || maxPrice){
        query.price={};
        if(minPrice){query.price.$gte=Number(minPrice)}
        if(maxPrice){query.price.$lte=Number(maxPrice)};
    };
    const skip=(page-1)*limit;
    const products=await Product.find(query).sort(sort).limit(Number(limit)).skip(skip);
    res.status(200).json(products);
});

exports.createProducts=asyncHandler(async(req,res)=>{
    const {title,description,price}=req.body
    if(!title||!description||!price){
        return res.status(400).json({msg:"details about product are missing"})
    };
    const newProduct=new Product({
        title,
        description,
        price,
        createdBy:req.user.id
    });
    await newProduct.save();
    return res.status(200).json({msg:"new product added",product:newProduct});
});

exports.getProductById=asyncHandler(async(req,res)=>{
    const productId=req.params.id;
    const product=await Product.findById(productId);
    if(!product){
        return res.status(400).json({msg:"product not found"})
    };
    return res.status(200).json(product)
});
exports.updateProduct=asyncHandler(async(req,res)=>{
    const productId=req.params.id;
    const data=req.body;
    const product=await Product.findByIdAndUpdate(productId,data,{new:true})
    if(!product){
        return res.status(400).json({msg:"product not found"})
    };
    return res.status(200).json(product);
});

exports.deleteProduct=asyncHandler(async(req,res)=>{
    const productId=req.params.id;
    const product=await Product.findByIdAndDelete(productId);
    if(!product){
        return res.status(400).json({msg:"product not found"})
    }
    return res.status(200).json({msg:"product deleted"});
});

