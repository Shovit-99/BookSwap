import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = async (e) => {
  e.preventDefault();
  const loginToast = toast.loading('Signing you in...');
  try {
    const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    
    toast.success('Login Successful! Welcome back.', { id: loginToast });
    
    window.location.href = "/";
  } catch (err) {
    toast.error(err.response?.data?.message || 'Login Failed', { id: loginToast });
  }
};

  return (
    <div className="flex justify-center items-center mt-20 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-500 mb-8">Login to start swapping books.</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;