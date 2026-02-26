import mongoose from "mongoose";
import dns from "node:dns";

// 1. Force Node to use Google's DNS instead of your system's DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4, // 2. Force IPv4 (Fixes the Node 18+ bug)
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;