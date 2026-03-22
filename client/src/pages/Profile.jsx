import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className="py-12 px-6 min-h-screen bg-[#faf9f6] dark:bg-slate-950 transition-colors font-sans">
      <div className="max-w-4xl mx-auto">
        
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 font-medium transition-colors">
          ← Back to Marketplace
        </Link>

        {/* Premium Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-sm border border-slate-100 dark:border-slate-800 mb-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
            <div className="h-32 w-32 bg-[#dcbca8]/20 text-[#dcbca8] dark:bg-slate-800 dark:text-white rounded-full flex items-center justify-center text-5xl font-black shrink-0">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="mt-2">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight capitalize">
                Welcome, {user?.name || 'User'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-3 text-lg">
                BookSwap Dehradun • Class 2026
              </p>
              
              <div className="inline-block mt-6 px-4 py-2 rounded-full text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {user?.role === 'seller' ? '✅ Verified Local Seller' : '📚 Active Student Buyer'}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#dcbca8]/10 rounded-full -mr-20 -mt-40 blur-3xl pointer-events-none"></div>
        </div>

        {/* WhatsApp Contact Card Only */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 max-w-md">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">WhatsApp Contact</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white">+{user?.phone || 'Not Linked'}</p>
        </div>

        {/* Dynamic Section: Only shows if they are a seller */}
        {user?.role === 'seller' && (
          <div className="mt-8 bg-[#dcbca8]/10 dark:bg-slate-900/50 border border-[#dcbca8]/30 dark:border-slate-800 p-8 rounded-[2rem] flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Manage Your Bundles</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">View, edit, or delete the books you are currently selling.</p>
            </div>
            <Link to="/my-listings" className="bg-[#dcbca8] text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-[#c9a792] transition-colors active:scale-95">
              View My Listings →
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;