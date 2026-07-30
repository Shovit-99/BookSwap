import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import Register from './pages/Register';
import MyListings from './pages/MyListings';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import { Toaster } from 'react-hot-toast';
import BookDetails from './pages/BookDetails';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState(() => {
    const user = localStorage.getItem('userInfo');
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const ProtectedRoute = ({ children }) => {
    return userInfo ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans">
        <Toaster position="top-center" reverseOrder={false} />
        
        <Routes>
          {/* Public auth pages - no navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Landing page as the home for unauthenticated users */}
          <Route path="/landing" element={<Landing />} />
          
          {/* Root: Dashboard for logged-in users, Landing for visitors */}
          <Route
            path="/"
            element={
              userInfo ? (
                <>
                  <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} userInfo={userInfo} setUserInfo={setUserInfo} />
                  <Dashboard />
                </>
              ) : (
                <Landing />
              )
            }
          />
          
          <Route
            path="/marketplace"
            element={
              <>
                <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} userInfo={userInfo} setUserInfo={setUserInfo} />
                <Marketplace searchQuery={searchQuery} />
              </>
            }
          />
          
          <Route
            path="/add-book"
            element={
              <>
                <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} userInfo={userInfo} setUserInfo={setUserInfo} />
                <ProtectedRoute><AddBook /></ProtectedRoute>
              </>
            }
          />
          
          <Route
            path="/my-listings"
            element={
              <>
                <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} userInfo={userInfo} setUserInfo={setUserInfo} />
                <ProtectedRoute><MyListings /></ProtectedRoute>
              </>
            }
          />
          
          <Route
            path="/profile"
            element={
              <>
                <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} userInfo={userInfo} setUserInfo={setUserInfo} />
                <ProtectedRoute><Profile /></ProtectedRoute>
              </>
            }
          />
          
          <Route
            path="/book/:id"
            element={
              <>
                <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} userInfo={userInfo} setUserInfo={setUserInfo} />
                <BookDetails />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;