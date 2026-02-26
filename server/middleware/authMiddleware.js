import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if the request header has an authorization token starting with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract just the token part (removes the word "Bearer ")
      token = req.headers.authorization.split(" ")[1];

      // Verify and decode the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in the database based on the decoded token ID
      // .select("-password") ensures we don't accidentally expose their hashed password
      req.user = await User.findById(decoded.id).select("-password");

      // Move on to the actual route controller
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};