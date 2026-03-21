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
  // 1. The "Brain" stays here: Check if they saved a preference before
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Save choice
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Save choice
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
        <Toaster position="top-center" reverseOrder={false} />
        
        {/* 2. Pass the controls to your Navbar */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* The floating button has been permanently removed! */}

        <Routes>
          <Route path="/" element={<Marketplace />} />
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