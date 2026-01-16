const jwt = require("jsonwebtoken");
require ("dotenv").config();

const authSeller = async(req, res, next) => {
  const {sellerToken}=req.cookies;
   if (!sellerToken) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
  
  try {

    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (decoded.email === process.env.SELLER_EMAIL) {
      return next();
    } else {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};

module.exports = authSeller;
