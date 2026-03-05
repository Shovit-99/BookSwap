import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: { 
      type: String, 
      required: true 
    },
    // Fixed: Moved inside the schema object
    role: { 
      type: String, 
      default: 'buyer', 
      enum: ['buyer', 'seller'] 
    }
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
  }
);

const User = mongoose.model("User", userSchema);
export default User;