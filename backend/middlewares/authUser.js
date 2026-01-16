const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const token = req.cookies?.token;  // safer than destructuring
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    req.user = decoded.id;
    return next(); // ensure middleware stops here
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};

module.exports = authUser;
