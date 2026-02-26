import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bundleTitle: { type: String, required: true }, // The main name (e.g., "Class 10 PCM Set")
    location: { type: String, required: true },    // Helps students find nearby sellers
    bookList: { type: String, required: true },    // The list of 4-5 books in the bundle
    price: { type: Number, required: true },       // Your discounted price
    originalPrice: { type: Number, required: true }, // For calculating that "70% OFF" badge
    grade: { type: String, required: true },       // Classes 6 to 12
    condition: { type: String, required: true },   // Good, Like New, etc.
    description: { type: String, required: false }, 
    image: { type: String, required: false },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isSold: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;