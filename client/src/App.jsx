import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import Register from './pages/Register';
import MyListings from './pages/MyListings';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Toaster position="top-center" reverseOrder={false} /> {/* Add this line */}
        <Navbar />
        {/* The Routes block decides which page to show based on the URL */}
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-listings" element={<MyListings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;