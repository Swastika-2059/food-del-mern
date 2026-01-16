const User=require("../models/user");

const updateCart=async(req,res)=>{
try{
const userId=req.user;
const { cartItems }=req.body;
const updatedUser= await User.findByIdAndUpdate(
    userId,
    {cartData: cartItems },
    {new:true},

);
if(!updatedUser){
    return res.status(404).json({message:"user not found" , success:false});
}
else{
res.status(200).json({updatedUser , success:true , message:"cart updated successfully"});
}
}
 catch(err){
       console.log(err);
        res.status(500).json({message:"server error", error: err.message})
    }
};

module.exports= updateCart;