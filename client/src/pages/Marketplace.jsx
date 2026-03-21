import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard'; // We will update this next!

const Marketplace = () => {
  const [books, setBooks] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

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
    const matchesGrade = selectedGrade === 'All' || String(book.grade) === String(selectedGrade);
    const subjectsString = Array.isArray(book.bookList) ? book.bookList.join(' ').toLowerCase() : String(book.bookList).toLowerCase();
    const matchesSearch = book.bundleTitle.toLowerCase().includes(searchTerm.toLowerCase()) || subjectsString.includes(searchTerm.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-950 transition-colors font-sans pb-20">
      
      {/* 1. The New Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Let's take a new journey with a new Book
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
              Access thousands of textbooks, bestsellers, and academic resources instantly in Dehradun. Save up to 80% by renting or buying local digital bundles.
            </p>
            
            <div className="flex items-center gap-4">
              <button className="bg-[#dcbca8] hover:bg-[#c9a792] text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Browsing
              </button>
              <button className="text-slate-900 dark:text-white font-semibold hover:underline px-4 py-3">
                How it Works
              </button>
            </div>

            {/* Platform Stats */}
            <div className="flex gap-10 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">10K+</p>
                <p className="text-sm text-slate-500 font-medium mt-1">Books Available</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">50K+</p>
                <p className="text-sm text-slate-500 font-medium mt-1">Happy Readers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">₹5M+</p>
                <p className="text-sm text-slate-500 font-medium mt-1">Saved by Students</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:w-1/2 w-full">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] relative">
              {/* Note: This is a placeholder image matching the vibe of studying/reading */}
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                alt="Student reading" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. The Clean Search & Browse Section */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Trending Now</h2>
            <p className="text-slate-500 mt-2">Top rental bundles this week</p>
          </div>

          {/* Minimalist Search & Filter */}
          <div className="flex gap-3 mt-6 md:mt-0 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search subjects..."
              className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-sm outline-none focus:border-[#dcbca8] dark:text-white w-full md:w-64 transition-colors"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium outline-none cursor-pointer dark:text-white"
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="All">All Classes</option>
              {[6, 7, 8, 9, 10, 11, 12].map(num => (
                <option key={num} value={num}>Class {num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <Link to={`/book/${book._id}`} key={book._id} className="group">
              <BookCard book={book} />
            </Link>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No bundles found for this search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;