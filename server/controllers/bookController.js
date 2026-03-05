import Book from "../models/Book.js";

// @desc    Create a new bundle listing (Requires Login)
// @route   POST /api/books
export const createBook = async (req, res) => {
  try {
    // 1. Destructure the new bundle-specific fields
    const { 
      bundleTitle, 
      location, 
      bookList, 
      price, 
      originalPrice, 
      grade, 
      condition, 
      description, 
      image 
    } = req.body;

    // 2. Create the record with the bundle data
    const book = await Book.create({
      bundleTitle,
      location,
      bookList,
      price,
      originalPrice,
      grade,
      condition,
      description,
      image,
      sellerId: req.user._id,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all unsold bundles (Public)
// @route   GET /api/books
export const getBooks = async (req, res) => {
  try {
    // 3. IMPORTANT: Populate 'phone' so the WhatsApp button works!
    const books = await Book.find({ isSold: false })
      .populate("sellerId", "name email phone"); 
    
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single bundle by ID (Public)
export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate("sellerId", "name phone");
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

// @desc    Update a bundle
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Bundle not found" });
    }

    if (book.sellerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a bundle
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Bundle not found" });
    }

    if (book.sellerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await book.deleteOne();
    res.json({ message: "Bundle removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get only the logged-in user's bundles
// @route   GET /api/books/my-listings
export const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ sellerId: req.user._id });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};