import express from "express";
import { 
  createBook, 
  getBooks, 
  getBookById, 
  updateBook, // <-- Imported
  deleteBook  // <-- Imported
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getBooks).post(protect, createBook);

// Notice we added the PUT (update) and DELETE routes here, protected by the middleware!
router.route("/:id")
  .get(getBookById)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

export default router;