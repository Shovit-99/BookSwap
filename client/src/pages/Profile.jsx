import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const toggleRole = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // Your digital ID card
        },
      };

      // Sends the request to the server to swap roles
      const { data } = await axios.put('/api/users/profile/role', {}, config);
      
      // Update the local storage so the Navbar and UI stay in sync
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      toast.success(`Welcome to ${data.role} mode! 🚀`);
      
      // Refresh to update the whole UI immediately
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  return (
    <div className="py-12 px-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Colorful Header Section */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[2.5rem] p-10 text-white shadow-2xl mb-10 relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-8">
            <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-black border-4 border-white/30 backdrop-blur-md">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">
                Welcome, {user?.role === 'seller' ? 'Seller' : 'Buyer'}!
              </h1>
              <p className="text-blue-100 font-medium mt-1">BookSwap Dehradun • Class 2026</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">WhatsApp Contact</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">+{user?.phone || 'Not Linked'}</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all">
            <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">
              Account Status
            </p>
            <div className="flex flex-col gap-4">
              {user?.role === 'seller' ? (
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-black text-blue-600 dark:text-blue-400">Verified Seller ✅</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-black text-green-600 dark:text-green-400">Active Buyer 📚</p>
                </div>
              )}
              
              {/* Interactive Toggle Button */}
              <button 
                onClick={toggleRole}
                className="w-full mt-2 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-md"
              >
                {user?.role === 'buyer' ? 'Switch to Seller Mode' : 'Switch to Buyer Mode'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;