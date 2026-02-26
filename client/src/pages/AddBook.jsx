import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [formData, setFormData] = useState({
    bundleTitle: '',
    location: '', // New Field
    bookList: '', // New Field for 4-5 books
    price: '',
    originalPrice: '',
    grade: '',
    condition: 'Good'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Bundle:", formData);
    // Backend connection coming next!
  };

  return (
    <div className="flex justify-center items-center mt-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-100 space-y-4">
        <h2 className="text-3xl font-black text-slate-900 mb-2">List a Grade Bundle</h2>
        <p className="text-slate-500 text-sm mb-4">Helping students in Classes 6-12 save money.</p>
        
        {/* Bundle Title */}
        <input 
          type="text" placeholder="Bundle Name (e.g. Full Class 10 Science Set)" required
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, bundleTitle: e.target.value})}
        />

        {/* Location - Important for meeting up! */}
        <input 
          type="text" placeholder="Your Location (e.g. Near City Park, Dehradun)" required
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, location: e.target.value})}
        />

        {/* Grade Selection */}
        <select 
          required
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, grade: e.target.value})}
        >
          <option value="">Select Class/Grade</option>
          {[6, 7, 8, 9, 10, 11, 12].map(num => (
            <option key={num} value={num}>Class {num}</option>
          ))}
        </select>

        {/* Bundle List - Ensure 4-5 books */}
        <textarea 
          placeholder="List the 4-5 books included (e.g. Math, Physics, Chem, English, History)" 
          required
          rows="3"
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, bookList: e.target.value})}
        />

        {/* Pricing Section */}
        <div className="flex space-x-4">
          <input 
            type="number" placeholder="Total Original Price" required
            className="w-1/2 px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
          />
          <input 
            type="number" placeholder="Bundle Price" required
            className="w-1/2 px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none font-bold text-blue-600"
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
        </div>

        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95">
          Post Grade Bundle
        </button>
      </form>
    </div>
  );
};

export default AddBook;