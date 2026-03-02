import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const MyListings = () => {
  const [myBooks, setMyBooks] = useState([]);

  const fetchMyBooks = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      };
      // We'll use a new route that only gets the logged-in user's books
      const { data } = await axios.get('http://localhost:5000/api/books/my-listings', config);
      setMyBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Is this bundle sold? Deleting will remove it from the market.")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        };
        await axios.delete(`http://localhost:5000/api/books/${id}`, config);
        fetchMyBooks(); // Refresh the list
      } catch (err) {
        alert("Failed to delete bundle");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-black text-slate-900 mb-8">My Book Bundles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {myBooks.map((book) => (
          <div key={book._id} className="relative">
            <BookCard book={book} />
            <button 
              onClick={() => deleteHandler(book._id)}
              className="mt-4 w-full bg-red-50 text-red-600 font-bold py-3 rounded-2xl hover:bg-red-600 hover:text-white transition-all"
            >
              🗑️ Delete Listing
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;