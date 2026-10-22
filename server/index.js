import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; 
import bookRoutes from "./routes/bookRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Configure CORS to handle both local development and your deployed frontend URL
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://book-swap-nfhu.vercel.app",
  ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL.replace(/\/$/, "")] : [])
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// --- ROUTES ---
app.use("/api/auth", authRoutes); 
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));