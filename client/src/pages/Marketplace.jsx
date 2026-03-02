import { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Marketplace = () => {
  const [books, setBooks] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [searchTerm, setSearchTerm] = useState(''); // New: Search state

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

  // Filter by both Grade AND Search Term
  const filteredBooks = books.filter(book => {
    const matchesGrade = selectedGrade === 'All' || book.grade === selectedGrade;
    const matchesSearch = book.bundleTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.bookList.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col space-y-6 mb-12">
        <h2 className="text-4xl font-black text-slate-900">Available Bundles</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* 🔍 Search Bar */}
          <div className="flex-1 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center">
            <span className="ml-3 text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search subjects (Maths, Physics, etc.)..."
              className="w-full p-3 outline-none font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 🎓 Grade Filter */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center px-4">
            <span className="font-bold text-slate-400 text-sm mr-3">Class:</span>
            <select 
              className="font-bold text-blue-600 outline-none"
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="All">All</option>
              {[6, 7, 8, 9, 10, 11, 12].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;