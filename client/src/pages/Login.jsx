import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
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
    <div className="min-h-screen bg-brand-cream flex items-center justify-center relative overflow-hidden py-12 px-6 font-sans">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-coral/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <Logo className="w-16 h-16 mb-6" textClassName="text-3xl" />
          <h2 className="text-4xl font-black text-brand-black mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-brand-black/60 font-medium text-lg">
            Log in to continue your book adventure
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-black/5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-brand-black mb-2">
                Email Address
              </label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="you@example.com" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full bg-brand-cream/50 border border-black/10 text-brand-black px-5 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium placeholder:text-brand-black/40" 
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-brand-black">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm font-bold text-brand-blue hover:text-brand-blue/80 transition-colors">
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
                className="w-full bg-brand-cream/50 border border-black/10 text-brand-black px-5 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium placeholder:text-brand-black/40" 
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 rounded-xl text-lg font-bold transition-all flex justify-center items-center gap-2 ${
                isLoading 
                  ? 'bg-brand-black/10 text-brand-black/40 cursor-not-allowed'
                  : 'bg-brand-black text-white hover:bg-brand-blue shadow-md hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10"></div>
            </div>
            <div className="relative flex justify-center text-sm font-bold">
              <span className="px-4 bg-white text-brand-black/40">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-brand-black/60 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="font-black text-brand-black hover:text-brand-blue transition-colors">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-brand-black/40 text-sm mt-8 font-medium">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  );
};

export default Login;