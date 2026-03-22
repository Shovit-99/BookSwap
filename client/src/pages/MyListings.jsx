import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyListings = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        // Fetch all books and filter to only show the logged-in user's bundles
        const { data } = await axios.get('http://localhost:5000/api/books');
        const userBooks = data.filter(book => book.seller?._id === user._id || book.user === user._id);
        setMyBooks(userBooks);
      } catch (err) {
        console.error("Error fetching listings", err);
        toast.error("Failed to load your listings");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchMyBooks();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bundle? This cannot be undone.')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        await axios.delete(`http://localhost:5000/api/books/${id}`, config);
        
        // Remove the deleted book from the UI instantly
        setMyBooks(myBooks.filter((book) => book._id !== id));
        toast.success('Bundle removed successfully');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete bundle');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-950 flex flex-col justify-center items-center transition-colors">
        <div className="animate-pulse text-2xl font-bold text-slate-400">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-950 py-12 px-6 transition-colors font-sans pb-24">
      <div className="max-w-7xl mx-auto">
        
        <Link to="/profile" className="inline-flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 font-medium transition-colors">
          ← Back to Profile
        </Link>

        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              My Active Listings
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Manage the book bundles you are currently selling to Dehradun students.
            </p>
          </div>
          
          <Link to="/add-book" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all active:scale-95 shadow-lg shadow-slate-900/10 inline-flex items-center gap-2 whitespace-nowrap">
            <span>+ Add New Bundle</span>
          </Link>
        </div>

        {/* Empty State */}
        {myBooks.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-[#dcbca8]/10 text-[#dcbca8] rounded-full flex items-center justify-center text-4xl mb-6">
              📚
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Active Bundles</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
              You haven't listed any study materials yet. Start selling your old books to help junior students save money!
            </p>
            <Link to="/add-book" className="bg-[#dcbca8] text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-[#c9a792] transition-colors shadow-lg shadow-[#dcbca8]/20 active:scale-95">
              Create Your First Listing
            </Link>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {myBooks.map((book) => (
              <div key={book._id} className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full group">
                
                {/* Abstract Book Cover Area */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 h-48 flex flex-col justify-center items-center relative overflow-hidden mb-5">
                  <div className="absolute top-3 left-3">
                    <span className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      Class {book.grade}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight capitalize text-center z-10">
                    {book.bundleTitle}
                  </h3>
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#dcbca8]/20 rounded-full blur-xl group-hover:bg-[#dcbca8]/40 transition-colors"></div>
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Asking Price</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">₹{book.price}</span>
                    <span className="text-sm text-slate-400 line-through font-medium">₹{book.originalPrice || book.price * 3}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link 
                    to={`/book/${book._id}`}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-center py-2.5 rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-center py-2.5 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;