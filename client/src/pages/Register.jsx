import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'buyer', // Default selected role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sends the form data (including the selected role) to the backend
      const { data } = await axios.post('/api/users/register', formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Account created successfully! 🎉');
      navigate('/');
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-950 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8 transition-colors font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-slate-500 dark:text-slate-400">
          Join BookSwap Dehradun today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-10 px-6 sm:px-10 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* The Role Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                I want to...
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => handleRoleSelect('buyer')}
                  className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                    formData.role === 'buyer' 
                      ? 'border-[#dcbca8] bg-[#dcbca8]/10 text-[#c9a792]' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-[#dcbca8]/50 text-slate-500'
                  }`}
                >
                  <span className="block text-2xl mb-1">📚</span>
                  <span className="font-bold text-sm">Buy Books</span>
                </div>
                <div 
                  onClick={() => handleRoleSelect('seller')}
                  className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all ${
                    formData.role === 'seller' 
                      ? 'border-[#dcbca8] bg-[#dcbca8]/10 text-[#c9a792]' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-[#dcbca8]/50 text-slate-500'
                  }`}
                >
                  <span className="block text-2xl mb-1">🏪</span>
                  <span className="font-bold text-sm">Sell Bundles</span>
                </div>
              </div>
            </div>

            {/* Standard Inputs */}
            <div>
              <input name="name" type="text" required placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] transition-all font-medium" />
            </div>
            <div>
              <input name="email" type="email" required placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] transition-all font-medium" />
            </div>
            <div>
              <input name="phone" type="tel" required placeholder="WhatsApp Number" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] transition-all font-medium" />
            </div>
            <div>
              <input name="password" type="password" required placeholder="Password" value={formData.password} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] transition-all font-medium" />
            </div>

            <button type="submit" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all active:scale-95 shadow-lg shadow-slate-900/10">
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-slate-900 dark:text-white hover:text-[#dcbca8] transition-colors">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;