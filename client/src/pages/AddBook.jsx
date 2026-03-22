import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    bundleTitle: '',
    location: '',
    grade: '6',
    bookList: '',
    originalPrice: '',
    price: '',
    condition: 'Good'
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

      await axios.post('http://localhost:5000/api/books', formData, config);
      toast.success('Bundle listed successfully! 🎉');
      navigate('/my-listings'); // Redirect to their listings page
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post bundle');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-950 py-12 px-6 transition-colors font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 font-medium transition-colors">
          ← Back to Marketplace
        </Link>

        {/* Premium Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden relative">
          
          {/* Decorative Top Banner */}
          <div className="h-3 w-full bg-[#dcbca8]"></div>

          <div className="p-10 md:p-14">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                List a Grade Bundle
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Post a set of 4-5 books to help other students save. Clear, detailed listings sell 3x faster.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section 1: Basic Info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Bundle Name</label>
                  <input 
                    type="text" 
                    name="bundleTitle"
                    value={formData.bundleTitle}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Class 10 PCM Full Set" 
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] focus:ring-4 focus:ring-[#dcbca8]/10 transition-all font-medium placeholder:font-normal"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Your Location</label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Rajpur Road, Dehradun" 
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] focus:ring-4 focus:ring-[#dcbca8]/10 transition-all font-medium placeholder:font-normal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Select Class/Grade</label>
                    <select 
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] focus:ring-4 focus:ring-[#dcbca8]/10 transition-all font-medium cursor-pointer appearance-none"
                    >
                      {[6, 7, 8, 9, 10, 11, 12].map(num => (
                        <option key={num} value={num}>Class {num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Helpful Tip Box */}
              <div className="bg-[#dcbca8]/10 border border-[#dcbca8]/30 rounded-xl p-5 flex gap-4 items-start">
                <div className="text-[#c9a792] shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Formatting Tip</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Separate each subject with a comma (e.g. <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded">Maths, Physics, English</span>) so they format into a beautiful list on your bundle page.</p>
                </div>
              </div>

              {/* Section 2: Book List */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Included Subjects / Books</label>
                <textarea 
                  name="bookList"
                  value={formData.bookList}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Physics, Maths, Chemistry, English..." 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] focus:ring-4 focus:ring-[#dcbca8]/10 transition-all font-medium placeholder:font-normal resize-none"
                ></textarea>
              </div>

              {/* Section 3: Pricing & Condition */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Original Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-400 font-bold">₹</span>
                    <input 
                      type="number" 
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      placeholder="Total New" 
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white pl-8 pr-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] transition-all font-medium"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-[#dcbca8] uppercase tracking-widest mb-2">Your Bundle Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-[#dcbca8] font-bold">₹</span>
                    <input 
                      type="number" 
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      placeholder="Your Price" 
                      className="w-full bg-[#dcbca8]/10 border border-[#dcbca8]/30 text-slate-900 dark:text-white pl-8 pr-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] focus:ring-4 focus:ring-[#dcbca8]/20 transition-all font-bold placeholder:font-normal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Condition</label>
                  <select 
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] transition-all font-medium cursor-pointer appearance-none"
                  >
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Heavily Used">Heavily Used</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-6 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-lg shadow-slate-900/10 active:scale-95'
                }`}
              >
                {isSubmitting ? 'Posting Bundle...' : 'Post Grade Bundle'}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;