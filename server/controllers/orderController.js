import Order from "../models/Order.js";
import Book from "../models/Book.js";

// @desc    Create a new order (Buy a book)
// @route   POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { bookId } = req.body;

    // 1. Find the book the user wants to buy
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.isSold) {
      return res.status(400).json({ message: "This book is already sold" });
    }

    // 2. Create the order
    const order = await Order.create({
      bookId: book._id,
      buyerId: req.user._id, // From the protect middleware
      sellerId: book.sellerId,
    });

    // 3. Mark the book as sold so it disappears from the marketplace
    book.isSold = true;
    await book.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's purchases
// @route   GET /api/orders/my
export const getMyOrders = async (req, res) => {
  try {
    // Find all orders where the buyer is the logged-in user, and populate the book details
    const orders = await Order.find({ buyerId: req.user._id }).populate("bookId", "title price image");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};