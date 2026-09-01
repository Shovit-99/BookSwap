import Book from "../models/Book.js";

// @desc    Create a new book listing
// @route   POST /api/books
export const createBook = async (req, res) => {
  try {
    const { 
      title, 
      author, 
      category, 
      price, 
      condition, 
      description, 
      image,
      location,
      includedBooks
    } = req.body;

    const book = await Book.create({
      title,
      author,
      category,
      price,
      condition,
      description,
      image,
      location,
      includedBooks,
      seller: req.user._id,
    });

    const populatedBook = await book.populate('seller', 'name email phone');
    res.status(201).json(populatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all unsold books
// @route   GET /api/books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ isSold: false })
      .populate("seller", "name email phone");
    
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single book by ID
// @route   GET /api/books/:id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("seller", "name email phone");
    
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

    if ((book.seller._id || book.seller).toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this book" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('seller', 'name email phone');

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

    if ((book.seller._id || book.seller).toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this book" });
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