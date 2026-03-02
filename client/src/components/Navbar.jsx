import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-10 flex justify-between items-center">
      <Link to="/" className="text-2xl font-black text-blue-600 italic">BookSwap</Link>
      
      <div className="space-x-8 font-bold text-slate-600 flex items-center">
        <Link to="/" className="hover:text-blue-600 transition-colors">Marketplace</Link>
        <Link to="/add-book" className="hover:text-blue-600 transition-colors">List a Bundle</Link>
        <Link to="/login" className="hover:text-blue-600 transition-colors">Login</Link>
        
        {/* Update this button */}
        <Link 
          to="/register" 
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;