import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '' // Critical for the WhatsApp Contact feature!
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  const loadingToast = toast.loading('Creating your account...'); // Stylish loading state
  
  try {
    const { data } = await axios.post('http://localhost:5000/api/users', formData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    
    toast.success('Welcome to BookSwap! 📚', { id: loadingToast }); // Success toast
    window.location.href = "/"; 
  } catch (err) {
    // Stylish error message instead of the browser popup
    toast.error(err.response?.data?.message || "Registration Failed", { id: loadingToast });
  }
};

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl w-96 space-y-4">
        <h2 className="text-3xl font-black mb-6">Join BookSwap</h2>
        <input type="text" placeholder="Full Name" required className="w-full p-4 rounded-xl bg-slate-50 border" 
          onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input type="email" placeholder="Email" required className="w-full p-4 rounded-xl bg-slate-50 border" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" required className="w-full p-4 rounded-xl bg-slate-50 border" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        {/* WhatsApp Number Input */}
        <input type="text" placeholder="WhatsApp Number (e.g. 919876543210)" required className="w-full p-4 rounded-xl bg-slate-50 border border-blue-200" 
          onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;