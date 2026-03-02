import express from "express";
import { registerUser } from "../controllers/userController.js";


const router = express.Router();

// This matches the axios.post('http://localhost:5000/api/users', ...) in your Register.jsx
router.post("/", registerUser);
router.post("/login", loginUser);

export default router;