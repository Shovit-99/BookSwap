import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    author: { 
      type: String, 
      required: true, 
      trim: true 
    },
    category: { 
      type: String, 
      required: true,
      enum: ['Fiction', 'Educational', 'Programming', 'Science', 'History', 'Biography', 'Self-Help', 'Other']
    },
    price: { 
      type: Number, 
      required: true 
    },
    condition: { 
      type: String, 
      required: true,
      enum: ['Like New', 'Good', 'Fair']
    },
    description: { 
      type: String,
      default: ""
    },
    image: { 
      type: String, 
      default: "https://via.placeholder.com/300x400?text=Book+Cover" 
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: "Dehradun"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Populate seller info when converting to JSON
bookSchema.pre(/^find/, function() {
  if (this.options._recursed) return;
  this.populate({
    path: 'seller',
    select: 'name email phone'
  });
});

const Book = mongoose.model("Book", bookSchema);
export default Book;