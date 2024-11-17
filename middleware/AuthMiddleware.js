const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (token,secret) => {
    return jwt.verify(token, secret);
}


const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authHeader",authHeader);
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token, "JWT_SECRET");
    req.user = payload;
    next();
}

module.exports = { authenticate };