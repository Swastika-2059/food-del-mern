const express=require("express");
const { isAuthUser, loginUser, logoutUser, registerUser }=require("../controllers/user");
const authUser=require("../middlewares/authUser");


const router=express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/logout", authUser, logoutUser);

router.get("/is-auth", authUser, isAuthUser);


module.exports=router;