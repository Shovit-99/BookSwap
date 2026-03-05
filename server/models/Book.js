import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bundleTitle: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    // Changed to Array so you can list them with bullet points in the UI
    bookList: { type: [String], required: true }, 
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    grade: { type: String, required: true }, // e.g., "Class 10"
    condition: { type: String, required: true },
    description: { type: String },
    image: { type: String, default: "https://via.placeholder.com/150" },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Links to the User who has the WhatsApp phone number
    },
    isSold: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Allows the discount calculation to show up in the frontend
  }
);

// This automatically calculates the discount percentage for your UI badge
bookSchema.virtual('discount').get(function() {
  return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
});

const Book = mongoose.model("Book", bookSchema);
export default Book;