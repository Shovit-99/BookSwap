import Book from "../models/Book.js";

// @desc    Create a new book listing (Requires Login)
// @route   POST /api/books
export const createBook = async (req, res) => {
  try {
    const { title, author, price, condition, description, image } = req.body;

    const book = await Book.create({
      title,
      author,
      price,
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

// @desc    Get all unsold books (Public)
// @route   GET /api/books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ isSold: false }).populate("sellerId", "name email");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single book by ID (Public)
// @route   GET /api/books/:id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("sellerId", "name email");
    
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.sellerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this book" });
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

// @desc    Delete a book
// @route   DELETE /api/books/:id
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.sellerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this book" });
    }

    await book.deleteOne();
    res.json({ message: "Book removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};