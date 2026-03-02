import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddBook = () => {
  const [formData, setFormData] = useState({
    bundleTitle: '',
    location: '',     // To show if the seller is near or far
    bookList: '',     // To list the 4-5 books included
    price: '',        // Your discounted price
    originalPrice: '', // Original market price
    grade: '',        // Class 6 to 12
    condition: 'Good'
  });

 const handleSubmit = async (e) => {
  e.preventDefault();
  const loadingToast = toast.loading('Posting your bundle...'); // Stylish loading state

  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post('http://localhost:5000/api/books', formData, config);

    // Stylish success message!
    toast.success('Bundle Posted! Students near you can now find it. 📚', { id: loadingToast });
    
    setTimeout(() => {
      window.location.href = "/"; 
    }, 1500); // Small delay so they can see the success toast
  } catch (err) {
    // Stylish error handling
    toast.error(err.response?.data?.message || "Failed to post. Are you logged in?", { id: loadingToast });
  }
};


  return (
    <div className="flex justify-center items-center mt-10 mb-20 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-100 space-y-4">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-900">List a Grade Bundle</h2>
          <p className="text-slate-500 text-sm">Post a set of 4-5 books to help other students save.</p>
        </div>
        
        {/* Bundle Title */}
        <input 
          type="text" placeholder="Bundle Name (e.g. Class 10 PCM Set)" required
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none transition-all"
          onChange={(e) => setFormData({...formData, bundleTitle: e.target.value})}
        />

        {/* Location tracking */}
        <input 
          type="text" placeholder="Your Location (e.g. Rajpur Road, Dehradun)" required
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none transition-all"
          onChange={(e) => setFormData({...formData, location: e.target.value})}
        />

        {/* Grade Selection (6-12) */}
        <select 
          required
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none transition-all"
          onChange={(e) => setFormData({...formData, grade: e.target.value})}
        >
          <option value="">Select Class/Grade</option>
          {[6, 7, 8, 9, 10, 11, 12].map(num => (
            <option key={num} value={num}>Class {num}</option>
          ))}
        </select>

        {/* Bundle Content Description */}
        <textarea 
          placeholder="List the 4-5 books included (e.g. Physics, Math, Chem, English, History)" 
          required
          rows="3"
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none transition-all"
          onChange={(e) => setFormData({...formData, bookList: e.target.value})}
        />

        {/* Pricing Section */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase">Original Price</label>
            <input 
              type="number" placeholder="₹ Total New" required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
            />
          </div>
          <div className="w-1/2">
            <label className="text-[10px] font-bold text-blue-500 ml-2 uppercase">Your Bundle Price</label>
            <input 
              type="number" placeholder="₹ Your Price" required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none font-bold text-blue-600"
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>

        {/* Condition Selection */}
        <select 
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none transition-all"
          onChange={(e) => setFormData({...formData, condition: e.target.value})}
        >
          <option value="Good">Condition: Good</option>
          <option value="Like New">Condition: Like New</option>
          <option value="Fair">Condition: Fair (Contains Notes)</option>
        </select>

        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 mt-4">
          Post Grade Bundle
        </button>
      </form>
    </div>
  );
};

export default AddBook;