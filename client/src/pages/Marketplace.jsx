import { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Marketplace = () => {
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-black text-slate-900 mb-8">Available Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;