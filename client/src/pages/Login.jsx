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
      // Sends login credentials to the backend
      const { data } = await axios.post('/api/users/login', formData);
      
      // Save user to browser and update UI
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
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-950 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8 transition-colors font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-slate-500 dark:text-slate-400">
          Log in to your BookSwap Dehradun account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-10 px-6 sm:px-10 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="you@example.com" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] focus:ring-4 focus:ring-[#dcbca8]/10 transition-all font-medium" 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Password
                </label>
                {/* Optional: You can link this to a forgot password route later */}
                <span className="text-xs font-bold text-[#dcbca8] hover:text-[#c9a792] cursor-pointer transition-colors">
                  Forgot?
                </span>
              </div>
              <input 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••" 
                value={formData.password} 
                onChange={handleChange} 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3.5 rounded-xl outline-none focus:border-[#dcbca8] focus:ring-4 focus:ring-[#dcbca8]/10 transition-all font-medium" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 rounded-xl text-lg font-bold transition-all flex justify-center items-center gap-2 ${
                isLoading 
                  ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 active:scale-95 shadow-lg shadow-slate-900/10'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Log In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-slate-900 dark:text-white hover:text-[#dcbca8] transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;