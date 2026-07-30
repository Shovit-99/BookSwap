import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = ({ searchQuery, setSearchQuery, userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = userInfo || JSON.parse(localStorage.getItem('userInfo') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    toast.success('Logged out successfully!');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#cfa168]/30 group-hover:border-[#cfa168] transition-colors" style={{ background: 'linear-gradient(135deg, rgba(207,161,104,0.1) 0%, rgba(156,106,48,0.2) 100%)' }}>
              <span className="text-xl">📚</span>
            </div>
            <span className="text-2xl font-black text-white hidden sm:block tracking-tight">
              Book<span className="premium-gradient-text">Swap</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <Link to="/marketplace" className="text-slate-300 hover:text-[#cfa168] font-semibold transition-colors">
              Marketplace
            </Link>
            {user && (
              <Link to="/my-listings" className="text-slate-300 hover:text-[#cfa168] font-semibold transition-colors">
                My Listings
              </Link>
            )}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs mx-4">
            <div className="relative w-full group">
              <span className="absolute left-3 top-3 text-slate-500 group-focus-within:text-[#cfa168] transition-colors">🔍</span>
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="w-full bg-slate-900/50 border border-slate-700/50 text-white pl-10 pr-4 py-2 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Add Book Button */}
            {user && (
              <Link
                to="/add-book"
                className="hidden md:block px-5 py-2 premium-btn rounded-lg text-sm"
              >
                + Add Book
              </Link>
            )}

            {/* Auth Links / User Menu */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-slate-300 hover:text-[#cfa168] font-semibold transition-colors flex items-center gap-2"
                  >
                    👤 <span className="hidden lg:inline">{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-slate-300 hover:text-red-400 font-semibold transition-colors flex items-center gap-2"
                  >
                    🚪 <span className="hidden lg:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[#cfa168] hover:text-[#fbe5b8] font-bold transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 premium-btn rounded-lg text-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-[#cfa168] transition-colors"
            >
              <span className="text-2xl">
                {mobileMenuOpen ? '✕' : '☰'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/50 mt-4 pt-4 pb-4 space-y-3">
            <div className="relative mb-3 group">
              <span className="absolute left-3 top-3 text-slate-500 group-focus-within:text-[#cfa168] transition-colors">🔍</span>
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="w-full bg-slate-900/50 border border-slate-700/50 text-white pl-10 pr-4 py-2 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 text-sm placeholder:text-slate-500 transition-all"
              />
            </div>

            <Link
              to="/marketplace"
              className="block text-slate-300 hover:text-[#cfa168] font-semibold transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-listings"
                  className="block text-slate-300 hover:text-[#cfa168] font-semibold transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Listings
                </Link>
                <Link
                  to="/add-book"
                  className="block px-4 py-2 premium-btn text-black font-bold rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  + Add Book
                </Link>
                <Link
                  to="/profile"
                  className="block text-slate-300 hover:text-[#cfa168] font-semibold transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-red-400 hover:text-red-300 font-semibold transition-colors py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-[#cfa168] hover:text-[#fbe5b8] font-bold transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 premium-btn text-black font-bold rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;