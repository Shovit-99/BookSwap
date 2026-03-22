import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Cleaned Register Logic
// Inside userController.js
export const registerUser = async (req, res) => {
  try {
    // 1. Extract role from the incoming request body
    const { name, email, password, phone, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // 2. Pass the role into the creation step (default to buyer if missing)
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'buyer', 
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role, // 3. Return the saved role
        token: generateToken(user._id), 
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cleaned Login Logic
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Verifying hashed password for security
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
      });
    } else {
      // Triggers the "Login Failed" toast in your frontend
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Function to toggle user role between buyer and seller
// Function to toggle user role
export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Toggle logic: if currently buyer, make seller; otherwise make buyer
      user.role = user.role === 'buyer' ? 'seller' : 'buyer';
      const updatedUser = await user.save();

      // Return the updated user so frontend localStorage can sync
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        token: req.headers.authorization.split(' ')[1], // Preserve the token
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};