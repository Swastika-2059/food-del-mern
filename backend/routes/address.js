const express=require("express");

const { addAddress, getAddress } = require("../controllers/address");
const authAddress = require("../middlewares/authAddress");
const router=express.Router();



router.post("/add",authAddress , addAddress);
router.get("/get",authAddress , getAddress);


module.exports=router; 