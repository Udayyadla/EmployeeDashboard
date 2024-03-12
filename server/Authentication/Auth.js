require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.authenticateUser=(req, res, next) =>{
    // Get the JWT token from request headers or cookies
    // const token = req.cookies.token;
    const token = req.headers.authorization;
    console.log(token)
  
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token not provided" });
    }
  
    // Verify the JWT token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      } else {
        // If token is valid, attach user information to request object
        req.user = decoded;
        console.log(req.user);
        next();
      }
    });
  }
