const express=require("express");

const updateCart = require("../controllers/cart");
const authUser= require("../middlewares/authUser");

const router=express.Router();

router.post("/updated", authUser, updateCart);

module.exports=router; 