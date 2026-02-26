import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import AddBook from './pages/AddBook';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Navbar />
        {/* The Routes block decides which page to show based on the URL */}
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;