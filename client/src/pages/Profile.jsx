import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('userInfo')) || {};
  const [stats, setStats] = useState({ orders: 0, saved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileStats = async () => {
      if (!user.token) {
        setLoading(false);
        return;
      }
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/books', config);
        
        if (user.role === 'seller') {
          const userBooks = data.filter(book => book.seller?._id === user._id);
          setStats({
            orders: Math.floor(userBooks.length * 0.3), // Mock sales based on listings
            saved: userBooks.length // Total listings
          });
        } else {
          // For buyers, mock stats based on total platform books
          setStats({
            orders: Math.floor(data.length * 0.1), 
            saved: Math.floor(data.length * 0.4)
          });
        }
      } catch (error) {
        console.error('Error fetching profile stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileStats();
  }, [user._id, user.token, user.role]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen premium-bg py-12 px-6 font-sans overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[40vh] bg-[#cfa168]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto relative z-10"
      >
        {/* Top Navigation */}
        <motion.div variants={fadeInUp} className="mb-8">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-[#cfa168] font-semibold transition-colors group">
            <span className="mr-2 group-hover:-translate-x-1 transition-transform text-[#cfa168]">←</span> 
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div variants={fadeInUp} className="relative premium-glass-card rounded-3xl overflow-hidden mb-8 shadow-2xl">
          {/* Banner */}
          <div className="h-48 bg-gradient-to-r from-[#cfa168]/20 via-[#b28347]/20 to-slate-900 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050810] to-transparent"></div>
          </div>
          
          <div className="px-6 md:px-10 pb-10 relative">
            {/* Avatar */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-20 mb-6">
              <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-[#cfa168] to-[#9c6a30] p-1 shadow-2xl shadow-[#cfa168]/20 rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-full h-full premium-bg rounded-xl flex items-center justify-center text-6xl font-black text-transparent bg-clip-text premium-gradient-text">
                  {user?.name?.charAt(0)?.toUpperCase() || 'S'}
                </div>
              </div>
              
              <div className="flex-1 pb-2 w-full">
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white capitalize tracking-tight">
                      {user?.name || 'Scholar'}
                    </h1>
                    <p className="text-[#cfa168] font-bold mt-2 text-lg">
                      {user?.email}
                    </p>
                  </div>
                  <button className="w-full md:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold transition-all backdrop-blur-sm">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-4 py-2 rounded-full bg-[#cfa168]/10 border border-[#cfa168]/30 text-[#fbe5b8] text-sm font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#cfa168] animate-pulse"></span>
                {user?.role === 'seller' ? 'Verified Seller' : 'Active Student Buyer'}
              </span>
              <span className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold">
                Member since 2026
              </span>
              <span className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold">
                Dehradun Campus
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Contact Details */}
          <motion.div variants={fadeInUp} className="md:col-span-1 space-y-8">
            <div className="premium-glass-card rounded-3xl p-8 hover:border-[#cfa168]/30 transition-colors shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">WhatsApp Number</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#cfa168]/10 text-[#cfa168] flex items-center justify-center shrink-0 border border-[#cfa168]/20">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <p className="text-xl font-bold text-white">+{user?.phone || 'Not Linked'}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/50">
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">Primary Email</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#b28347]/10 text-[#fbe5b8] flex items-center justify-center shrink-0 border border-[#b28347]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <p className="text-sm font-bold text-white break-all">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats & Actions */}
          <motion.div variants={fadeInUp} className="md:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="premium-glass-card rounded-3xl p-8 hover:border-[#cfa168]/30 transition-colors">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-2xl mb-4 border border-[#cfa168]/20">🛒</div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">
                  {user?.role === 'seller' ? 'Total Sales' : 'Total Orders'}
                </p>
                <p className="text-4xl font-black text-white">
                  {loading ? '...' : stats.orders}
                </p>
              </div>
              <div className="premium-glass-card rounded-3xl p-8 hover:border-[#cfa168]/30 transition-colors">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-2xl mb-4 border border-[#cfa168]/20">🔖</div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">
                  {user?.role === 'seller' ? 'Active Listings' : 'Books Saved'}
                </p>
                <p className="text-4xl font-black text-white">
                  {loading ? '...' : stats.saved}
                </p>
              </div>
            </div>

            {/* Seller Action Card */}
            {user?.role === 'seller' ? (
              <div className="premium-glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2 group-hover:text-[#cfa168] transition-colors tracking-tight">Manage Listings</h3>
                    <p className="text-slate-300 font-medium max-w-sm">View, edit, or remove the books you are currently selling on the marketplace.</p>
                  </div>
                  <Link to="/my-listings" className="shrink-0 w-full md:w-auto px-8 py-4 premium-btn text-center rounded-xl transition-all shadow-lg shadow-[#cfa168]/20">
                    Seller Dashboard →
                  </Link>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#cfa168]/10 blur-3xl rounded-full pointer-events-none"></div>
              </div>
            ) : (
              <div className="premium-glass-card p-10 rounded-3xl relative overflow-hidden text-center">
                <div className="w-20 h-20 bg-slate-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#cfa168]/20 text-4xl shadow-xl">
                  💼
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Want to sell books?</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto text-lg">Upgrade to a seller account to list your books on the marketplace and start earning today.</p>
                <button className="px-8 py-4 premium-btn rounded-xl transition-all shadow-xl">
                  Become a Seller
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;