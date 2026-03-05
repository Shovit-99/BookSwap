import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  // Check if user data exists in storage
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    // 1. Remove the user data from the browser
    localStorage.removeItem('userInfo');
    
    // 2. Show a stylish "Goodbye" toast
    toast.success('Logged out successfully! See you soon. 📚');
    
    // 3. Redirect to the marketplace
    navigate('/');
    
    // 4. Force a refresh so the Navbar updates its buttons
    window.location.reload();
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 p-4 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-blue-600">BookSwap</Link>
        
        <div className="space-x-6 flex items-center">
          <Link to="/" className="dark:text-white font-medium">Marketplace</Link>

          <Link to="/add-book" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition-all">
      + List a Bundle
    </Link>
          
          {user ? (
            <>
              {/* This is how you reach the Dashboard/Profile! */}
              <Link to="/profile" className="dark:text-white font-medium">My Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="dark:text-white font-medium">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;