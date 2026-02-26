import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Both of these routes require the user to be logged in
router.route("/").post(protect, createOrder);
router.route("/my").get(protect, getMyOrders);

export default router;