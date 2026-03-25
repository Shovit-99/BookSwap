import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = ({ darkMode, setDarkMode, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    toast.success('Logged out successfully!');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-[#fcfaf6] dark:bg-slate-950 border-b border-[#ece7de] dark:border-slate-800 px-6 py-4 font-sans sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center gap-4 lg:gap-8">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="text-[#3b5d73] dark:text-[#cca98f]">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-3xl font-bold tracking-tight text-[#3b5d73] dark:text-white hidden sm:block">
            Book<span className="text-[#c19d82]">Swap</span>
          </span>
        </Link>
        
        {/* Middle: Exact Links from Image */}
        <div className="hidden lg:flex items-center gap-6 flex-grow justify-center">
          <Link to="/" className="text-slate-900 dark:text-white font-bold hover:text-[#c19d82] dark:hover:text-[#cca98f] transition-colors">Marketplace</Link>
          <a href="#trending" className="text-slate-900 dark:text-white font-bold hover:text-[#c19d82] dark:hover:text-[#cca98f] transition-colors">Browse</a>
          {user && <Link to="/my-listings" className="text-slate-900 dark:text-white font-bold hover:text-[#c19d82] dark:hover:text-[#cca98f] transition-colors">My Library</Link>}
          
          <Link to="/add-book" className="bg-[#cca98f] hover:bg-[#b8957b] text-white px-5 py-2.5 rounded font-bold transition-all shadow-sm mx-4">
            + List a Bundle
          </Link>
          
          {/* Search Bar */}
          <div className="relative w-64">
            <input 
              type="text" 
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              placeholder="Search subjects..." 
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded py-2.5 pl-4 pr-10 text-sm outline-none focus:border-[#cca98f] text-slate-900 dark:text-white transition-colors"
            />
            <div className="absolute right-3 top-2.5 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
        </div>

        {/* Right: Theme Toggle, Dashboard & Logout */}
        <div className="flex items-center gap-4 shrink-0">
          
          {/* DARK MODE TOGGLE IS BACK! */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl p-2 rounded-full hover:bg-[#ece7de] dark:hover:bg-slate-800 transition-colors mr-2"
            title="Toggle Light/Dark Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {user ? (
            <>
              <Link to="/profile" className="text-slate-900 dark:text-white font-bold hover:text-[#cca98f]">Dashboard</Link>
              <button onClick={handleLogout} className="text-slate-900 dark:text-white font-bold hover:text-[#cca98f]">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-900 dark:text-white font-bold hover:text-[#cca98f]">Login</Link>
              <Link to="/register" className="bg-[#3b5d73] dark:bg-[#cca98f] text-white px-5 py-2.5 rounded font-bold hover:bg-[#2c4759] dark:hover:bg-[#b8957b]">Sign Up</Link>
            </>
          )}
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;