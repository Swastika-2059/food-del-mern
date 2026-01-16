const express=require("express");
const authUser = require("../middlewares/authUser");
const { placeOrder, getUserOrders, getAllOrders } = require("../controllers/order");
const authSeller= require("../middlewares/authSeller");
const router=express.Router();



router.post("/cod", authUser, placeOrder);
router.get("/user", authUser, getUserOrders);
router.get("/seller", authSeller, getAllOrders);

module.exports=router; 