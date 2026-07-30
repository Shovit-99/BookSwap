import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/users/login', formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Welcome back! 📚');
      navigate('/');
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
      setIsLoading(false);
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
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 text-lg">
            Log in to continue your book adventure
          </p>
        </div>

        {/* Form Card */}
        <div className="premium-glass-card rounded-3xl p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">
                Email Address
              </label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="you@example.com" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all font-medium placeholder:text-slate-500" 
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm font-bold text-[#cfa168] hover:text-[#fbe5b8] transition-colors">
                  Forgot?
                </Link>
              </div>
              <input 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••" 
                value={formData.password} 
                onChange={handleChange} 
                className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-5 py-3.5 rounded-lg outline-none focus:border-[#cfa168]/50 focus:ring-2 focus:ring-[#cfa168]/20 transition-all font-medium placeholder:text-slate-500" 
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3.5 rounded-lg text-lg transition-all flex justify-center items-center gap-2 tracking-widest ${
                isLoading 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'premium-btn'
              }`}
            >
              {isLoading ? '🔄 Signing in...' : '✨ Log In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/80 text-slate-400">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#cfa168] hover:text-[#fbe5b8] transition-colors">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  );
};

export default Login;