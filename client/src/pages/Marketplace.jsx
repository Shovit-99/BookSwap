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

    return title.includes(safeSearchQuery) ||
      author.includes(safeSearchQuery) ||
      category.includes(safeSearchQuery);
  });

  return (
    <div className="min-h-screen premium-bg font-sans pb-20">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#050810] py-20 px-6 border-b border-slate-800/50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#cfa168]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#b28347]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
                  Discover Your
                  <span className="block premium-gradient-text pt-2 pb-2">
                    Next Great Read
                  </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                  Browse thousands of books. Buy, sell, and swap with book lovers in your community.
                </p>
              </div>

              {/* Popular Searches */}
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Popular Categories</p>
                <div className="flex flex-wrap gap-3">
                  {['Fiction', 'Educational', 'Programming', 'Science'].map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-300 text-sm font-semibold hover:border-[#cfa168]/50 hover:text-[#cfa168] transition-all cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block">
              <div className="rounded-3xl overflow-hidden h-[400px] relative shadow-2xl shadow-[#cfa168]/10 border border-[#cfa168]/20">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#050810]/50 z-10 pointer-events-none"></div>
                <img
                  src="/marketplace-banner.png"
                  alt="Books"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Available Books</h2>
              <p className="text-slate-400">{filteredBooks.length} books found</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">Loading books...</p>
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
          <div className="text-center py-20 premium-glass-card rounded-2xl">
            <p className="text-slate-400 text-lg">
              No books found{searchQuery && ` for "${searchQuery}"`}. Try adjusting your search!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;