import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery && searchQuery.trim() !== '') {
      navigate('/marketplace');
    }
  };

  return (
    <div className="sticky top-4 z-50 px-4 md:px-8 font-sans">
      <nav className="bg-white/90 backdrop-blur-md border border-black/5 shadow-sm max-w-7xl mx-auto rounded-3xl">
        <div className="px-6 py-3">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Logo className="w-10 h-10 shrink-0" textClassName="text-2xl hidden sm:block" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              <Link to="/marketplace" className="text-brand-black/70 hover:text-brand-blue font-bold transition-colors">
                Marketplace
              </Link>
              {user && (
                <Link to="/my-listings" className="text-brand-black/70 hover:text-brand-blue font-bold transition-colors">
                  My Listings
                </Link>
              )}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs mx-4">
              <form onSubmit={handleSearchSubmit} className="relative w-full group">
                <button type="submit" className="absolute left-3 top-2.5 text-brand-black/40 group-focus-within:text-brand-blue transition-colors cursor-pointer">🔍</button>
                <input
                  type="text"
                  value={searchQuery || ''}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                  placeholder="Search books..."
                  className="w-full bg-brand-cream/50 border border-black/10 text-brand-black pl-10 pr-4 py-2 rounded-full outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all placeholder:text-brand-black/40 font-medium"
                />
              </form>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Add Book Button */}
              {user && (
                <Link
                  to="/add-book"
                  className="hidden md:flex premium-btn-primary py-2 px-5 text-sm"
                >
                  + Add Book
                </Link>
              )}

              {/* Auth Links / User Menu */}
              <div className="hidden md:flex items-center gap-4 ml-2">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="text-brand-black hover:text-brand-blue font-bold transition-colors flex items-center gap-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center border border-black/10">👤</div>
                      <span className="hidden lg:inline">{user.name}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-brand-black/60 hover:text-brand-coral font-bold transition-colors flex items-center gap-2"
                    >
                      <span className="hidden lg:inline">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-brand-black hover:text-brand-blue font-bold transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="premium-btn-primary py-2 px-5 text-sm"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-brand-black hover:text-brand-blue transition-colors w-10 h-10 flex items-center justify-center rounded-full bg-brand-cream"
              >
                <span className="text-xl font-bold">
                  {mobileMenuOpen ? '✕' : '☰'}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-black/10 mt-4 pt-4 pb-2 space-y-3">
              <form 
                onSubmit={(e) => {
                  handleSearchSubmit(e);
                  setMobileMenuOpen(false);
                }} 
                className="relative mb-4 group"
              >
                <button type="submit" className="absolute left-3 top-2.5 text-brand-black/40 group-focus-within:text-brand-blue transition-colors cursor-pointer">🔍</button>
                <input
                  type="text"
                  value={searchQuery || ''}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                  placeholder="Search books..."
                  className="w-full bg-brand-cream/50 border border-black/10 text-brand-black pl-10 pr-4 py-2 rounded-full outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm placeholder:text-brand-black/40 font-medium transition-all"
                />
              </form>

              <Link
                to="/marketplace"
                className="block text-brand-black hover:text-brand-blue font-bold transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Marketplace
              </Link>

              {user ? (
                <>
                  <Link
                    to="/my-listings"
                    className="block text-brand-black hover:text-brand-blue font-bold transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Listings
                  </Link>
                  <Link
                    to="/add-book"
                    className="block premium-btn-primary text-center w-full mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    + Add Book
                  </Link>
                  <Link
                    to="/profile"
                    className="block text-brand-black hover:text-brand-blue font-bold transition-colors py-2 mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-brand-coral hover:text-brand-coral/80 font-bold transition-colors py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-brand-black hover:text-brand-blue font-bold transition-colors py-2 text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="block premium-btn-primary text-center w-full mt-2"
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
    </div>
  );
};

export default Navbar;