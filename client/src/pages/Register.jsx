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
    role: 'buyer',
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
      const { data } = await axios.post('/api/users', formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Account created successfully! 🎉');
      navigate('/');
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };



  return (
    <div className="min-h-screen premium-bg flex items-center justify-center relative overflow-hidden py-12 px-6">
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#cfa168]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b28347]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
            Book<span className="premium-gradient-text">Swap</span>
          </h1>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Create an Account</h2>
          <p className="text-slate-400 text-lg">
            Join our book-loving community today
          </p>
        </div>

        {/* Form Card */}
        <div className="premium-glass-card rounded-3xl p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">
                What's your role?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'buyer', label: 'Buy Books', icon: '📚' },
                  { value: 'seller', label: 'Sell Books', icon: '🏪' }
                ].map(role => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => handleRoleSelect(role.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-center font-bold ${
                      formData.role === role.value
                        ? 'border-[#cfa168] bg-[#cfa168]/20 text-[#fbe5b8]'
                        : 'border-slate-700/50 bg-slate-900/50 text-slate-400 hover:border-[#cfa168]/50 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{role.icon}</span>
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <input
                name="name"
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all font-medium placeholder:text-slate-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                name="email"
                type="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all font-medium placeholder:text-slate-500"
              />
            </div>

            {/* Phone Input */}
            <div>
              <input
                name="phone"
                type="tel"
                required
                placeholder="WhatsApp Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all font-medium placeholder:text-slate-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                name="password"
                type="password"
                required
                placeholder="Create a Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all font-medium placeholder:text-slate-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg text-lg transition-all tracking-widest premium-btn"
            >
              ✨ Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/80 text-slate-400">or</span>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#cfa168] hover:text-[#fbe5b8] transition-colors">
              Log in here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          By signing up, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default Register;