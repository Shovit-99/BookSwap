import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Fiction',
    price: '',
    condition: 'Good',
    description: '',
    location: 'Dehradun'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      await axios.post('/api/books', formData, config);
      toast.success('Book listed successfully! 🎉');
      navigate('/my-listings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to list book');
      setIsSubmitting(false);
    }
  };

  const categories = ['Fiction', 'Educational', 'Programming', 'Science', 'History', 'Biography', 'Self-Help', 'Other'];
  const conditions = ['Like New', 'Good', 'Fair'];

  return (
    <div className="min-h-screen premium-bg py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-[#cfa168] mb-8 font-semibold transition-colors">
          ← Back to Marketplace
        </Link>

        {/* Form Card */}
        <div className="premium-glass-card rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Header */}
          <div className="h-1 w-full bg-gradient-to-r from-[#cfa168] to-[#9c6a30]"></div>

          <div className="p-8 md:p-12">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
                List a <span className="premium-gradient-text">New Book</span>
              </h1>
              <p className="text-slate-400 text-lg">
                Share your book with our community and help others find their next great read
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Book Title */}
              <div>
                <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">
                  Book Title
                </label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. The Great Gatsby" 
                  className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all placeholder:text-slate-500"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">
                  Author
                </label>
                <input 
                  type="text" 
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  placeholder="e.g. F. Scott Fitzgerald" 
                  className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all placeholder:text-slate-500"
                />
              </div>

              {/* Category & Condition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">
                    Category
                  </label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">
                    Condition
                  </label>
                  <select 
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all"
                  >
                    {conditions.map(cond => (
                      <option key={cond} value={cond} className="bg-slate-900">{cond}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">
                    Price (₹)
                  </label>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 299" 
                    className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">
                    Location
                  </label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Rajpur Road, Dehradun" 
                    className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">
                  Description
                </label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the book, its condition, and any special notes..." 
                  rows="5"
                  className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all placeholder:text-slate-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg text-lg transition-all tracking-widest flex justify-center items-center gap-2 ${
                  isSubmitting 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'premium-btn'
                }`}
              >
                {isSubmitting ? '⏳ Publishing...' : '✨ Publish Book'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;