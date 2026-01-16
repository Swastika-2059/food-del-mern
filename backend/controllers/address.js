const Address=require("../models/address");

const addAddress=async(req , res)=>{
    console.log("req.cookies:", req.cookies);
console.log("req.user:", req.user);

    try{
      
const {address}=req.body;
const userId=req.user;




await Address.create({
    ...address,
    userId,
});
res.status(201).json({message:"Address added successfully", success:true});
    }
    catch(err){
       console.log(err);
        res.status(500).json({message:"server error", error: err.message})
    }
};

const getAddress=async(req,res)=>{
    try{
 const userId = req.user; 
const addresses=await Address.find({userId}).sort({createdAt:-1});
 res.status(200).json({success:true, addresses});
    }
    catch(err){
       console.log(err);
        res.status(500).json({message:"server error", error: err.message})
    }
};
;
module.exports={addAddress, getAddress}
