import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Marketplace = ({ searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get('/api/books');
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const safeSearchQuery = (searchQuery || '').toLowerCase();
    const title = (book.title || '').toLowerCase();
    const author = (book.author || '').toLowerCase();
    const category = (book.category || '').toLowerCase();

    // Check if query matches main title, author, or category
    if (title.includes(safeSearchQuery) || author.includes(safeSearchQuery) || category.includes(safeSearchQuery)) {
      return true;
    }

    // Check if query matches any book in the bundle
    if (book.includedBooks && book.includedBooks.length > 0) {
      return book.includedBooks.some(includedBook => {
        const includedTitle = (includedBook.title || '').toLowerCase();
        const includedAuthor = (includedBook.author || '').toLowerCase();
        return includedTitle.includes(safeSearchQuery) || includedAuthor.includes(safeSearchQuery);
      });
    }

    return false;
  });

  return (
    <div className="min-h-screen bg-brand-cream font-sans pb-20">

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-brand-black leading-tight mb-6 tracking-tight">
            Discover Your<br/>
            <span className="text-brand-blue">
              Next Great Read
            </span>
          </h1>
          <p className="text-xl text-brand-black/60 leading-relaxed max-w-2xl mx-auto font-medium mb-10">
            Browse thousands of books. Buy, sell, and swap with book lovers in your community.
          </p>

          {/* Popular Searches */}
          <div className="flex flex-wrap justify-center gap-3">
            {['Fiction', 'Educational', 'Programming', 'Science', 'Fantasy', 'Romance'].map((tag, i) => (
              <span
                key={i}
                className="px-6 py-3 rounded-full bg-white border border-black/5 text-brand-black/80 font-bold hover:border-brand-blue hover:text-brand-blue transition-all cursor-pointer shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-10 flex justify-between items-end border-b border-black/5 pb-4">
          <div>
            <h2 className="text-4xl font-black text-brand-black mb-2 tracking-tight">Available Books</h2>
            <p className="text-brand-black/60 font-medium">{filteredBooks.length} books found</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-32">
            <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-brand-black/60 text-lg font-bold">Loading books...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBooks.map((book) => (
              <Link to={`/book/${book._id}`} key={book._id} className="h-full">
                <BookCard book={book} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border border-black/5 shadow-sm">
            <p className="text-brand-black/60 text-xl font-bold">
              No books found{searchQuery && ` for "${searchQuery}"`}. Try adjusting your search!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;