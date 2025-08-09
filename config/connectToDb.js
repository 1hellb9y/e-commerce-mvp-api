const mongoose=require("mongoose");
async function ConnectToDb(){
    await mongoose.connect("mongodb://localhost:27017/e-commerce").then(()=>{console.log(`Connected`)}).catch((err)=>{console.log("error")});
    console.log("/");
};

module.exports=ConnectToDb;