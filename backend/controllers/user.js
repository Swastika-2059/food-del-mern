const User= require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

 const registerUser=async(req,res)=>{
    try{
        const{name, email, password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"all fields re require", success:false
            });
        }
            const existingUser=await User.findOne({email});
            if(existingUser){

            return res.status(400).json({message:"user already exist ", success:false});
        }
        const hashedPassword=await bcrypt.hash(password, 10);
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        });
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token", token,{
            httpOnly:true,
            secure: process.env.NODE_ENV ==="production",
            sameSite:process.env.NODE_ENV ==="production" ? "none" :"strict",
            maxAge:7 * 24 * 60 * 60 * 1000, 
        }  );

        res.json({
            message:"user registered successfully",
            success:true,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
            },
        });


    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
};

 const loginUser=async(req,res)=>{
    try{
        const {email, password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"all the fields is required", success:false})
        }
    
     const user=await User.findOne({email});
            if(!user){

            return res.status(400).json({message:"user already exist ", success:false});
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid email or password ", success:false});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token", token,{
            httpOnly:true,
            secure: process.env.NODE_ENV ==="production",
            sameSite:process.env.NODE_ENV ==="production" ? "none" :"strict",
            maxAge:7 * 24 * 60 * 60 * 1000, 
        }  );
        res.json({
            message:"user login successfully",
            success:true,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
            },
        });

    }
    catch(err){
        console.log(err);
         res.status(500).json({message:"internal server error"});
    }
};
 const logoutUser=(req,res)=>{
    try{
        res.clearCookie("token", token,{
            httpOnly:true,
            secure: process.env.NODE_ENV ==="production",
            sameSite:process.env.NODE_ENV ==="production" ? "none" :"strict",
            
        }  );
return res.json({message:"logged out successfully ", success:false});
    }
    catch(err){
        console.log(err);
         res.status(500).json({message:"internal server error"});
    }
};

// check auth user

 const isAuthUser=async(req,res)=>{
    try{
const userId=req.user;
 if(!userId){

            return res.status(401).json({message:"Unauthorized ", success:false});
        }
        const user= await User.findById(userId).select("password");
        res.json({
            success:true,
            user:{
                id:userId,
            }
        })
    }
     catch(err){
        console.log(err);
         res.status(500).json({message:"internal server error"});
    }
};

module.exports={ isAuthUser, loginUser, logoutUser, registerUser };

