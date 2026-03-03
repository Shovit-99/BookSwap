import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Colorful Header Section */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[2.5rem] p-10 text-white shadow-2xl mb-10 relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-8">
             <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-black border-4 border-white/30 backdrop-blur-md">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">Welcome, {user?.name || 'Scholar'}!</h1>
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
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">Status</p>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400">Verified Seller ✅</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;