import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Marketplace = ({ searchQuery }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/books');
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books", err);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const safeSearchQuery = (searchQuery || '').toLowerCase();
    const bundleTitle = (book.bundleTitle || '').toLowerCase();
    const subjectsString = Array.isArray(book.bookList) 
      ? book.bookList.join(' ').toLowerCase() 
      : String(book.bookList || '').toLowerCase();
    
    return bundleTitle.includes(safeSearchQuery) || subjectsString.includes(safeSearchQuery);
  });

  return (
    <div className="min-h-screen bg-[#fcfaf6] dark:bg-slate-950 font-sans pb-20 transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Text & Creative Element */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight transition-colors">
              Let's take a new journey with a new Book
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg transition-colors">
              Access thousands of textbooks, bestsellers, and academic resources instantly. Save up to 80% by renting digital copies.
            </p>
            
            {/* Interactive Social Card */}
            <div className="pt-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[#ece7de] dark:border-slate-800 shadow-sm inline-block w-full max-w-md relative overflow-hidden group transition-colors">
                
                {/* Decorative side accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[#cca98f] group-hover:bg-[#3b5d73] dark:group-hover:bg-[#cca98f] transition-colors"></div>
                
                <p className="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2 transition-colors">
                  <span className="text-lg">🔥</span> Popular Searches
                </p>
                
                {/* Clickable Action Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {['Class 10 PCM', 'Class 12 Commerce', 'JEE Mains', 'ICSE Board'].map((tag, i) => (
                    <a 
                      key={i} 
                      href="#trending"
                      className="px-4 py-2 rounded-lg bg-[#fcfaf6] dark:bg-slate-800 border border-[#ece7de] dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-[#cca98f] dark:hover:bg-[#cca98f] hover:text-white dark:hover:text-white hover:border-[#cca98f] transition-all"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
                
                {/* Social Proof Footer */}
                <div className="mt-6 pt-4 border-t border-[#ece7de] dark:border-slate-800 flex items-center gap-3 transition-colors">
                   <div className="flex -space-x-2">
                     <div className="w-8 h-8 rounded-full bg-[#3b5d73] border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white font-bold z-30 shadow-sm">RS</div>
                     <div className="w-8 h-8 rounded-full bg-[#cca98f] border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white font-bold z-20 shadow-sm">AK</div>
                     <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-slate-600 dark:text-slate-300 font-bold z-10 shadow-sm">+1k</div>
                   </div>
                   <p className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">Active students swapping today</p>
                </div>

              </div>
            </div>

          </div>

          {/* Right Hero Image */}
          <div className="lg:w-1/2 w-full">
            <div className="rounded-[2.5rem] overflow-hidden h-[400px] relative shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                alt="Student reading" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div id="trending" className="max-w-7xl mx-auto px-6 mt-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Available Bundles</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 transition-colors">Recently added by students</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <Link to={`/book/${book._id}`} key={book._id} className="h-full block">
              <BookCard book={book} />
            </Link>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400 font-bold transition-colors">
            No bundles found for "{searchQuery}". Try clearing your search!
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;