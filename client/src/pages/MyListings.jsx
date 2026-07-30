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
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get('/api/books', config);
        const userBooks = data.filter(book => book.seller?._id === user._id);
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
        await axios.delete(`/api/books/${id}`, config);
        
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
      <div className="min-h-screen premium-bg flex flex-col justify-center items-center">
        <div className="animate-pulse text-2xl font-bold text-[#cfa168]">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen premium-bg py-12 px-6 font-sans pb-24">
      <div className="max-w-7xl mx-auto">
        
        <Link to="/profile" className="inline-flex items-center text-slate-400 hover:text-[#cfa168] mb-8 font-semibold transition-colors">
          ← Back to Profile
        </Link>

        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
              My Active Listings
            </h1>
            <p className="text-slate-400">
              Manage the book bundles you are currently selling to Dehradun students.
            </p>
          </div>
          
          <Link to="/add-book" className="premium-btn px-6 py-3 rounded-xl shadow-lg shadow-[#cfa168]/10 inline-flex items-center gap-2 whitespace-nowrap">
            <span>+ Add New Bundle</span>
          </Link>
        </div>

        {/* Empty State */}
        {myBooks.length === 0 ? (
          <div className="premium-glass-card border border-dashed border-slate-700 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-[#cfa168]/10 text-[#cfa168] rounded-full flex items-center justify-center text-4xl mb-6">
              📚
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Active Bundles</h2>
            <p className="text-slate-400 max-w-md mb-8">
              You haven't listed any study materials yet. Start selling your old books to help junior students save money!
            </p>
            <Link to="/add-book" className="premium-btn px-8 py-4 rounded-xl shadow-lg shadow-[#cfa168]/20">
              Create Your First Listing
            </Link>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {myBooks.map((book) => (
              <div key={book._id} className="premium-glass-card rounded-2xl p-5 flex flex-col h-full group hover:border-[#cfa168]/30 transition-all">
                
                {/* Abstract Book Cover Area */}
                <div className="bg-[#0a0f1c] border border-[#cfa168]/20 rounded-xl p-6 h-48 flex flex-col justify-center items-center relative overflow-hidden mb-5">
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#cfa168]/90 text-[#050810] text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                      Class {book.grade}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white leading-tight capitalize text-center z-10 group-hover:text-[#cfa168] transition-colors">
                    {book.title}
                  </h3>
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#cfa168]/20 rounded-full blur-xl group-hover:bg-[#cfa168]/40 transition-colors"></div>
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Asking Price</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-black text-white">₹{book.price}</span>
                    <span className="text-sm text-slate-500 line-through font-medium">₹{book.originalPrice || book.price * 3}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/50">
                  <Link 
                    to={`/book/${book._id}`}
                    className="bg-slate-800 text-slate-300 text-center py-2.5 rounded-lg text-sm font-bold hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500/10 text-red-400 text-center py-2.5 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"
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