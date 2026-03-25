import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import Register from './pages/Register';
import MyListings from './pages/MyListings';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import BookDetails from './pages/BookDetails';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // NEW: Global Search State
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-950 transition-colors duration-300 font-sans">
        <Toaster position="top-center" reverseOrder={false} />
        
        {/* Pass the search state down to the Navbar so the input can type into it */}
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <Routes>
          {/* Pass the search state down to Marketplace so it can filter books */}
          <Route path="/" element={<Marketplace searchQuery={searchQuery} />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;