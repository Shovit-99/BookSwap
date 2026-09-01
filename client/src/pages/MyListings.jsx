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
    if (window.confirm('Are you sure you want to delete this listing? This cannot be undone.')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        await axios.delete(`/api/books/${id}`, config);
        
        setMyBooks(myBooks.filter((book) => book._id !== id));
        toast.success('Listing removed successfully');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete listing');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-6 font-sans pb-24">
      <div className="max-w-7xl mx-auto pt-16">
        
        <Link to="/profile" className="inline-flex items-center text-brand-black/60 hover:text-brand-blue mb-8 font-bold transition-colors">
          ← Back to Profile
        </Link>

        {/* Page Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-2">
              My Active Listings
            </h1>
            <p className="text-brand-black/60 font-medium text-lg">
              Manage the book bundles you are currently selling to the community.
            </p>
          </div>
          
          <Link to="/add-book" className="px-8 py-4 bg-brand-black text-white hover:bg-brand-blue font-bold rounded-full transition-transform hover:-translate-y-1 shadow-xl whitespace-nowrap">
            + Add New Listing
          </Link>
        </div>

        {/* Empty State */}
        {myBooks.length === 0 ? (
          <div className="bg-white border border-dashed border-black/20 rounded-[3rem] p-16 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-3xl font-black text-brand-black mb-4">No Active Listings</h2>
            <p className="text-brand-black/60 font-medium max-w-md mb-8 text-lg">
              You haven't listed any books yet. Start selling your old books to help others and earn!
            </p>
            <Link to="/add-book" className="px-8 py-4 bg-brand-blue text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {myBooks.map((book) => (
              <div key={book._id} className="bg-white rounded-3xl p-5 flex flex-col h-full group hover:-translate-y-1 transition-transform border border-black/5 shadow-sm">
                
                {/* Abstract Book Cover Area */}
                <div className="bg-brand-cream border border-black/5 rounded-2xl p-6 h-48 flex flex-col justify-center items-center relative overflow-hidden mb-5">
                  <h3 className="text-xl font-black text-brand-black leading-tight text-center z-10 group-hover:text-brand-blue transition-colors line-clamp-3">
                    {book.title}
                  </h3>
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-brand-coral/20 rounded-full blur-2xl group-hover:bg-brand-blue/20 transition-colors"></div>
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <p className="text-xs text-brand-black/50 font-bold uppercase tracking-widest mb-1">Asking Price</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-black text-brand-black">₹{book.price}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-5 border-t border-black/5">
                  <Link 
                    to={`/book/${book._id}`}
                    className="bg-brand-cream text-brand-black text-center py-3 rounded-xl font-bold hover:bg-brand-black hover:text-white transition-colors"
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-50 text-red-500 text-center py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-colors"
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