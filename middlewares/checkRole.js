const checkRole=(roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(400).json({
                msg:"you dont have permission to this action"
            })
        };
        next()
    };
};
module.exports=checkRole;