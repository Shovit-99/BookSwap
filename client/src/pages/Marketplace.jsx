import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';

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
    
    // FIX: Convert array to string for searching
    const subjectsString = Array.isArray(book.bookList) 
      ? book.bookList.join(' ').toLowerCase() 
      : String(book.bookList).toLowerCase();

    const matchesSearch = 
      book.bundleTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
      subjectsString.includes(searchTerm.toLowerCase());

    return matchesGrade && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="flex flex-col space-y-6 mb-12">
        {/* Visible Title for Dark Mode */}
        <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          Available Bundles
        </h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center transition-all focus-within:ring-2 focus-within:ring-blue-500">
            <span className="ml-3 text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search subjects (Maths, Physics, etc.)..."
              className="w-full p-3 outline-none font-medium bg-transparent dark:text-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center px-4">
            <span className="font-bold text-slate-400 text-sm mr-3">Class:</span>
            <select 
              className="font-bold text-blue-600 dark:text-blue-400 outline-none bg-transparent cursor-pointer"
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="All">All Grades</option>
              {[6, 7, 8, 9, 10, 11, 12].map(num => (
                <option key={num} value={num}>Class {num}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <Link to={`/book/${book._id}`} key={book._id} className="transform transition-all hover:scale-[1.03]">
            <BookCard book={book} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;