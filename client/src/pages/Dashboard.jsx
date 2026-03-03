import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Colorful Header Section */}
        <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-[2rem] p-10 text-white shadow-2xl mb-10 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-2">Hey, {user?.name || 'Scholar'}! 👋</h1>
            <p className="text-blue-100 font-medium italic">Ready to swap some knowledge today?</p>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <span className="text-blue-500 text-2xl">📱</span>
            <h3 className="text-slate-400 font-bold text-xs uppercase mt-4">WhatsApp Link</h3>
            <p className="text-2xl font-black text-slate-900 dark:text-white">+{user?.phone || 'Not Linked'}</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <span className="text-indigo-500 text-2xl">🎓</span>
            <h3 className="text-slate-400 font-bold text-xs uppercase mt-4">Student Status</h3>
            <p className="text-2xl font-black text-slate-900 dark:text-white">Verified Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;