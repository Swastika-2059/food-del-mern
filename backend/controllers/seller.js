const jwt = require("jsonwebtoken");
require ("dotenv").config();
     
const sellerLogin = async (req,res) => {
  try {
   
 const { email,password } = req.body;

    // Check against env variables
    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
      
    ) {
      // Create JWT token
      const token = jwt.sign(
        { email}, process.env.JWT_SECRET,
        { expiresIn: "1d", }
      );

      // Send token in cookie (if using cookies)
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:process.env.NODE_ENV === "production"? "none":"strict",
        maxAge: 1*24*60*60*1000,
      });

      return res.status(200).json({
       
        message: "Seller login successful",
         success: true,
      });
    }
    else{

    return res.status(400).json({
     
      message: "Invalid email or password",
     success: false,
    });
  }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error during seller login",
    });
  }
};

const sellerLogout = async (req, res) => {
  try{
      res.clearCookie("sellerToken",{
         httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:process.env.NODE_ENV === "production"? "none":"strict",
      });
  return res.status(200).json({ success: true, message: "Seller logged out successfully" });
    }
    catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token", error: err.message });
    
  }
};

// const isAuthSeller = async (req, res) => {
//   try {
//     const token = req.cookies.sellerToken;
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Not authenticated" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return res.json({ success: true, seller: decoded });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: "Invalid token", error: err.message });
    
//   }
// };
const isAuthSeller = async (req, res) => {
  try {
    const token = req.cookies?.sellerToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extra validation: only allow env-based seller email
    if (decoded.email !== process.env.SELLER_EMAIL) {
      return res.status(403).json({ success: false, message: "Invalid seller token" });
    }

    return res.json({ success: true, seller: decoded });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token", error: err.message });
  }
};


module.exports = { sellerLogin, sellerLogout, isAuthSeller };
