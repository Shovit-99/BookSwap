import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/users', formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Account created successfully! 🎉');
      navigate('/');
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center relative overflow-hidden py-12 px-6 font-sans">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-brand-green/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <Logo className="w-16 h-16 mb-6" textClassName="text-3xl" />
          <h2 className="text-4xl font-black text-brand-black mb-2 tracking-tight">Create an Account</h2>
          <p className="text-brand-black/60 font-medium text-lg">
            Join our book-loving community today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-black/5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-bold text-brand-black mb-2">
                What's your primary goal?
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
                    className={`p-4 rounded-xl border-2 transition-all text-center font-bold flex flex-col items-center justify-center gap-2 ${
                      formData.role === role.value
                        ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                        : 'border-black/5 bg-brand-cream/50 text-brand-black/60 hover:border-black/20 hover:text-brand-black'
                    }`}
                  >
                    <span className="text-2xl">{role.icon}</span>
                    <span className="text-sm">{role.label}</span>
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
                className="w-full bg-brand-cream/50 border border-black/10 text-brand-black px-5 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium placeholder:text-brand-black/40"
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
                className="w-full bg-brand-cream/50 border border-black/10 text-brand-black px-5 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium placeholder:text-brand-black/40"
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
                className="w-full bg-brand-cream/50 border border-black/10 text-brand-black px-5 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium placeholder:text-brand-black/40"
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10"></div>
            </div>
            <div className="relative flex justify-center text-sm font-bold">
              <span className="px-4 bg-white text-brand-black/40">or</span>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-brand-black/60 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="font-black text-brand-black hover:text-brand-blue transition-colors">
              Log in here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-brand-black/40 text-sm mt-8 font-medium">
          By signing up, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default Register;