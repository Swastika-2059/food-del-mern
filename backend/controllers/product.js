const Product=require("../models/product");
const fs=require("fs");
const cloudinary=require("cloudinary").v2;

const addProduct=async(req,res)=>{
try{
  const{name, description, price, offerPrice, category }=req.body;
  const image=req.files ?.map((file)=>file.filename);
if(
    !name||
    !description||
    !price||
    !offerPrice||
    !category||
    !image||
    image.length===0
){

 return res.status(400).json({message:"all fields are required", success:false});

}

//   let imageUrl=await Promise.all(images.map(async(item)=>{
//     let result=await cloudinary.uploader.upload(item.path,{
//         resource_type:"image",
//     });
//     return result.secure_url;
//   })
//    );
  const product=new Product({
    name,
    description,
    price,
    offerPrice,
    category,
    image,
  });
  const savedProduct=await product.save();
return res.status(201).json({
    success: true,
    product: savedProduct,
    message:"product added successfully",
});
}catch(err){
        console.log(err);
      return  res.status(500).json({message:"server error", error: err.message})
    }
};

const getProducts=async(req,res)=>{
    try{
const products=await Product.find({}).sort({createdAT:-1});
res.status(200).json({products, success:true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error", error:error.message})
    }
};


const getProductById=async(req,res)=>{
    try{
const {id}=req.body;
const product=await Product.findById(id);
if(!product){
    return res.status(404).json({message:"product not found", success:true});
}
res.status(200).json({product, success:true});

    }
    catch(err){
       console.log(err);
        res.status(500).json({message:"server error", error: error.message})
    }
};

const changeStock=async(req,res)=>{
    try{
const {id, inStock}=req.body;
const product = await Product.findByIdAndUpdate(id,{inStock},{new:true});
if(!product){
    return res.status(404).json({message:"product not found", success:false});
}
res.status(200).json({product, success:false , message:"stock updated successfully"});
    }
     catch(err){
       console.log(err);
        res.status(500).json({message:"server error", error: error.message})
    }
};

module.exports={addProduct, getProducts, getProductById, changeStock};

