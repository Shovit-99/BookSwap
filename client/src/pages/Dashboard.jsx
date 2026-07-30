import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo')) || {};
  
  const [stats, setStats] = useState({
    totalListings: 0,
    totalSales: 0,
    totalEarnings: 0,
    activeOrders: 0
  });
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user._id) {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };

        const booksRes = await axios.get('/api/books', config);
        const userBooks = booksRes.data.filter(book => book.seller?._id === user._id);
        
        const totalEarnings = userBooks.reduce((sum, book) => sum + (book.price || 0), 0);
        
        setStats({
          totalListings: userBooks.length,
          totalSales: Math.floor(userBooks.length * 0.3),
          totalEarnings: totalEarnings,
          activeOrders: Math.floor(userBooks.length * 0.2)
        });
        
        setRecentListings(userBooks.slice(0, 6));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user._id, user.token, navigate]);

  const statCards = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      ),
      label: 'Active Listings',
      value: stats.totalListings,
      color: 'emerald'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      ),
      label: 'Orders Received',
      value: stats.activeOrders,
      color: 'teal'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
      ),
      label: 'Total Earnings',
      value: `₹${stats.totalEarnings.toLocaleString()}`,
      color: 'cyan'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ),
      label: 'Verified Status',
      value: 'Premium',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen premium-bg py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Hero */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-3xl premium-glass-card p-8 md:p-12">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#cfa168]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b28347]/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
                Hey, <span className="premium-gradient-text">{user?.name || 'Scholar'}</span>! 👋
              </h1>
              <p className="text-lg text-slate-300 font-medium">
                Welcome to your BookSwap dashboard. Track your sales and manage your listings below.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((card, idx) => {
            return (
              <div key={idx} className="premium-glass-card rounded-2xl p-6 hover:shadow-lg hover:shadow-[#cfa168]/10 hover:border-[#cfa168]/40 transition-all duration-300 group">
                <div className="text-[#cfa168] mb-4 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">
                  {card.label}
                </p>
                <p className="text-3xl font-black text-white group-hover:text-[#fbe5b8] transition-colors">
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Listings */}
          <div className="lg:col-span-2">
            <div className="premium-glass-card rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-white tracking-tight">Recent Listings</h2>
                <Link 
                  to="/add-book"
                  className="px-5 py-2 premium-btn rounded-lg text-sm"
                >
                  + Add Book
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin text-[#cfa168] text-3xl">📚</div>
                  <p className="text-slate-400 mt-3">Loading your listings...</p>
                </div>
              ) : recentListings.length > 0 ? (
                <div className="space-y-4">
                  {recentListings.map((book, idx) => (
                    <div key={idx} className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-5 hover:border-[#cfa168]/40 transition-all duration-300 group">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-white mb-1 group-hover:text-[#cfa168] transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-sm text-slate-400">
                            by {book.author}
                          </p>
                          <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b28347]"></span>
                            Condition: <span className="text-slate-300 font-semibold">{book.condition}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-white group-hover:text-[#fbe5b8] transition-colors">
                            ₹{book.price}
                          </p>
                          <p className="text-xs text-[#cfa168] mt-1 font-semibold tracking-wider uppercase">Available</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-900/30 rounded-xl border border-dashed border-slate-700/50">
                  <p className="text-slate-400 mb-4 text-lg">No listings yet</p>
                  <Link 
                    to="/add-book"
                    className="inline-block px-6 py-3 premium-btn rounded-lg transition-all"
                  >
                    Add Your First Book
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="premium-glass-card rounded-2xl p-6">
              <h3 className="text-lg font-black text-white mb-4 tracking-tight">Profile Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1 tracking-wider">Email</p>
                  <p className="text-white font-semibold break-all text-sm">{user?.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1 tracking-wider">Phone</p>
                  <p className="text-white font-semibold text-sm">
                    {user?.phone || 'Not added'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1 tracking-wider">Member Since</p>
                  <p className="text-white font-semibold text-sm">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                  </p>
                </div>
                <Link
                  to="/profile"
                  className="w-full mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold rounded-lg transition-all text-center text-sm inline-block"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="premium-glass-card rounded-2xl p-6">
              <h3 className="text-lg font-black text-white mb-4 tracking-tight">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { label: 'Browse Marketplace', link: '/marketplace' },
                  { label: 'My Listings', link: '/my-listings' },
                  { label: 'Profile Settings', link: '/profile' }
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.link}
                    className="block px-4 py-3 bg-slate-900/50 hover:bg-[#cfa168]/10 border border-slate-700/50 hover:border-[#cfa168]/30 text-white hover:text-[#cfa168] rounded-xl transition-all text-center font-semibold text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Premium Badge */}
            <div className="premium-glass-card rounded-2xl p-6 text-center border-[#cfa168]/20 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#cfa168]/10 rounded-full blur-2xl"></div>
              <p className="text-3xl mb-3 relative z-10">⭐</p>
              <p className="text-sm text-slate-300 font-semibold relative z-10">
                You're a <span className="premium-gradient-text font-black text-base ml-1">Premium Member</span>
              </p>
              <p className="text-xs text-slate-400 mt-2 relative z-10">
                Enjoy priority listings and features
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;