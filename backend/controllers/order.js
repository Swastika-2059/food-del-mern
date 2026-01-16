const Order=require("../models/order");
const Product = require("../models/product");


const placeOrder=async(req,res)=>{
try{
const userId=req.user;
const { items, address }=req.body;
if(!items || !address){
    return res.status(400).json({message:"items and address are required", success:false})
}
let amount=await items.reduce(async(acc , item)=>{
    const product = await Product.findById(item.product);
    return (await acc) + product.offerPrice * item.quantity;

}, 0);

amount+=Math.floor((amount * 2)/100);
await Order.create({
    userId,
    items,
    address,
    amount,
    paymentType:"COD",
    isPaid:false,
});
return res.status(201).json({message:"order placed successfully", success:true});

}
 catch(err){
       console.log(err);
        res.status(500).json({message:"server error", error: err.message})
    }
};

const getUserOrders=async(req,res)=>{
    try{
      const userId=req.user;
      const orders=await Order.find({
        userId,
        $or:[{paymentType:"COD"}, {isPaid:true}],
      }).populate("items.product address").sort({createdAt: -1});
      res.status(200).json({success:true, orders})
    }
     catch(err){
       console.log(err);
        res.status(500).json({message:"server error", error: err.message})
    }
};

const getAllOrders=async(req,res)=>{
    try{
 const orders=await Order.find({
        $or:[{paymentType:"COD"}, {isPaid:true}],
      }).populate("items.product address").sort({createdAt: -1});
      res.status(200).json({
        success: true,
        orders,
      });
    }
    catch(err){
       console.log(err);
        res.status(500).json({message:"server error", error: err.message})
    }
};

module.exports={placeOrder, getUserOrders, getAllOrders };