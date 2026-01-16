const express=require("express");
const   authSeller =require("../middlewares/authSeller");
const upload = require("../config/multer");
const { addProduct, getProducts, getProductById, changeStock } = require("../controllers/product");

const router=express.Router();

router.post("/add-product",authSeller, upload.array("image"), addProduct);
router.get("/list",getProducts);
router.get("/id",getProductById);
router.post("/stock",authSeller, changeStock);





module.exports=router; 