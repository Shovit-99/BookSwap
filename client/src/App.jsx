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

function App() {
  const [darkMode, setDarkMode] = useState(false);
// src/App.jsx
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    // This is the line that actually enables Light Mode!
    document.documentElement.classList.remove('dark'); 
  }
}, [darkMode]);
  return (
    <Router>
      {/* Dynamic background colors for Light/Dark mode */}
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
        <Toaster position="top-center" reverseOrder={false} />
        
        <Navbar />

        {/* Floating Theme Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white dark:bg-blue-600 dark:text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;