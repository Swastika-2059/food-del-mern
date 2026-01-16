const express=require("express");
const cors =require("cors");
const cookieParser =require( "cookie-parser");
const  connectDB  = require("./config/connnectDB");
const path = require("path");
require("dotenv").config();


const userRoutes=require("./routes/user");
const productRoutes=require("./routes/product");
const cartRoutes=require("./routes/cart");
const sellerRoutes=require("./routes/seller");
const orderRoutes=require("./routes/order");
const addressRoutes=require("./routes/address");
const connectCloudinary = require("./config/cloudinary.js");



const app=express();
const PORT=process.env.PORT;


connectDB();
connectCloudinary();

const corsOptions={
  origin: ["https://food-del-frontend-gkmw.onrender.com", "https://food-del-frontend-gkmw.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

 
// app.use(cors({origin:allowedOrigins, credentials:true}));
app.use(cors(corsOptions));

app.use(express.json());             // parses application/json
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());




app.get("/",(req,res)=>{
  res.send("hello from the backend");
});
app.get("/registered",(req,res)=>{
  res.send("nice")
})
app.post("/test", (req, res) => {
    console.log(req.body);
    res.json({ received: req.body });
});


app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);


app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`)
})
