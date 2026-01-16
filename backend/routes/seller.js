const express=require("express");
const { isAuthSeller, sellerLogin, sellerLogout } =require( "../controllers/seller");
const  authSeller =require("../middlewares/authSeller");



const router=express.Router();

router.post("/login", sellerLogin);
router.get("/is-auth",authSeller, isAuthSeller);
router.post("/logout", authSeller, sellerLogout);

module.exports=router; 