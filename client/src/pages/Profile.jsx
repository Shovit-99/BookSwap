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

  const handleRoleToggle = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put('/api/users/profile/role', {}, config);
      localStorage.setItem('userInfo', JSON.stringify(data));
      window.location.reload();
    } catch (error) {
      console.error('Error toggling role:', error);
    }
  };

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
    <div className="min-h-screen bg-brand-cream py-12 px-6 font-sans overflow-hidden relative">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto pt-10 relative z-10"
      >
        {/* Top Navigation */}
        <motion.div variants={fadeInUp} className="mb-8">
          <Link to="/" className="inline-flex items-center text-brand-black/60 hover:text-brand-blue font-bold transition-colors group">
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> 
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div variants={fadeInUp} className="bg-white rounded-[3rem] border border-black/5 overflow-hidden mb-8 shadow-xl">
          {/* Banner */}
          <div className="h-48 bg-brand-blue relative">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-black/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/3"></div>
          </div>
          
          <div className="px-8 md:px-12 pb-12 relative">
            {/* Avatar */}
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-end -mt-20 mb-8">
              <div className="w-40 h-40 rounded-[2rem] bg-brand-cream border-8 border-white flex items-center justify-center shadow-lg">
                <span className="text-6xl font-black text-brand-black">
                  {user?.name?.charAt(0)?.toUpperCase() || 'S'}
                </span>
              </div>
              
              <div className="flex-1 w-full pb-2">
                <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
                  <div>
                    <h1 className="text-5xl font-black text-brand-black capitalize tracking-tight mb-2">
                      {user?.name || 'Scholar'}
                    </h1>
                    <p className="text-brand-black/60 font-bold text-lg">
                      {user?.email}
                    </p>
                  </div>
                  <button className="w-full md:w-auto px-8 py-4 bg-brand-cream hover:bg-brand-black text-brand-black hover:text-white rounded-full font-bold transition-colors shadow-sm">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-2.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse"></span>
                {user?.role === 'seller' ? 'Verified Seller' : 'Active Student Buyer'}
              </span>
              <span className="px-5 py-2.5 rounded-full bg-brand-cream text-brand-black/70 text-sm font-bold border border-black/5">
                Member since 2026
              </span>
              <span className="px-5 py-2.5 rounded-full bg-brand-cream text-brand-black/70 text-sm font-bold border border-black/5">
                Dehradun Campus
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Contact Details */}
          <motion.div variants={fadeInUp} className="md:col-span-1 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h3 className="text-2xl font-black text-brand-black mb-6 tracking-tight border-b border-black/5 pb-4">Contact Info</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-brand-black/50 uppercase tracking-widest font-bold mb-3">WhatsApp Number</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <p className="text-lg font-black text-brand-black">+{user?.phone || 'Not Linked'}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/5">
                  <p className="text-xs text-brand-black/50 uppercase tracking-widest font-bold mb-3">Primary Email</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <p className="text-sm font-bold text-brand-black break-all">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats & Actions */}
          <motion.div variants={fadeInUp} className="md:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                <div className="w-14 h-14 bg-brand-cream rounded-2xl flex items-center justify-center text-3xl mb-6">🛒</div>
                <p className="text-brand-black/50 text-sm font-bold uppercase tracking-widest mb-1">
                  {user?.role === 'seller' ? 'Total Sales' : 'Total Orders'}
                </p>
                <p className="text-5xl font-black text-brand-black tracking-tight">
                  {loading ? '...' : stats.orders}
                </p>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                <div className="w-14 h-14 bg-brand-cream rounded-2xl flex items-center justify-center text-3xl mb-6">🔖</div>
                <p className="text-brand-black/50 text-sm font-bold uppercase tracking-widest mb-1">
                  {user?.role === 'seller' ? 'Active Listings' : 'Books Saved'}
                </p>
                <p className="text-5xl font-black text-brand-black tracking-tight">
                  {loading ? '...' : stats.saved}
                </p>
              </div>
            </div>

            {/* Seller Action Card */}
            {user?.role === 'seller' ? (
              <div className="bg-brand-black text-white p-8 md:p-12 rounded-[3rem] relative overflow-hidden group shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h3 className="text-3xl font-black mb-3 tracking-tight">Manage Listings</h3>
                    <p className="text-white/70 font-medium max-w-sm text-lg">View, edit, or remove the books you are currently selling on the marketplace.</p>
                  </div>
                  <Link to="/my-listings" className="shrink-0 w-full md:w-auto px-8 py-4 bg-white text-brand-black font-bold rounded-full transition-transform hover:-translate-y-1 shadow-lg whitespace-nowrap">
                    Seller Dashboard →
                  </Link>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/30 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              </div>
            ) : (
              <div className="bg-brand-blue text-white p-10 md:p-12 rounded-[3rem] relative overflow-hidden text-center shadow-xl">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
                  💼
                </div>
                <h3 className="text-4xl font-black mb-4 tracking-tight">Want to sell books?</h3>
                <p className="text-white/80 mb-10 max-w-lg mx-auto text-lg font-medium">Upgrade to a seller account to list your books on the marketplace and start earning today.</p>
                <button 
                  onClick={handleRoleToggle}
                  className="px-10 py-4 bg-white text-brand-blue font-bold rounded-full transition-transform hover:scale-105 shadow-xl"
                >
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