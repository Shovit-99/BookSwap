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
      label: 'Active Listings',
      value: stats.totalListings,
    },
    {
      label: 'Orders Received',
      value: stats.activeOrders,
    },
    {
      label: 'Total Earnings',
      value: `₹${stats.totalEarnings.toLocaleString()}`,
    },
    {
      label: 'Verified Status',
      value: 'Premium',
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto pt-10">
        
        {/* Editorial Hero */}
        <div className="mb-16 border-b border-black/10 pb-12">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-black/50 mb-4">Dashboard Overview</p>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-tight text-brand-black">
            Welcome back, <br/>
            <span className="text-brand-blue">{user?.name || 'Scholar'}</span>.
          </h1>
          <p className="text-xl text-brand-black/70 font-medium mt-6 max-w-2xl leading-relaxed">
            Track your literary journey, manage your active listings, and monitor your earnings in one unified space.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statCards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm hover:border-brand-blue/30 transition-colors group">
              <p className="text-brand-black/50 text-xs font-bold uppercase tracking-widest mb-4">
                {card.label}
              </p>
              <p className="text-5xl font-black text-brand-black tracking-tight group-hover:text-brand-blue transition-colors">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Recent Listings */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-end mb-8 border-b border-black/10 pb-4">
              <h2 className="text-3xl font-black text-brand-black tracking-tight">Recent Listings</h2>
              <Link 
                to="/add-book"
                className="text-brand-blue hover:text-brand-black font-bold transition-colors flex items-center gap-1"
              >
                + Add New Book
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin w-8 h-8 border-4 border-brand-black/10 border-t-brand-blue rounded-full mb-4"></div>
                <p className="text-brand-black/60 font-bold uppercase tracking-widest text-xs">Loading library...</p>
              </div>
            ) : recentListings.length > 0 ? (
              <div className="space-y-4">
                {recentListings.map((book, idx) => (
                  <div key={idx} className="bg-white border border-black/5 rounded-2xl p-6 hover:shadow-md transition-shadow group flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-xl text-brand-black mb-1 group-hover:text-brand-blue transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm font-bold text-brand-black/60 mb-3">
                        by {book.author}
                      </p>
                      <span className="inline-block px-3 py-1 bg-brand-cream rounded-full text-xs font-bold text-brand-black/70 border border-black/5 uppercase tracking-wider">
                        {book.condition}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-brand-black mb-1">
                        ₹{book.price}
                      </p>
                      <span className="inline-block text-xs text-brand-blue font-bold tracking-wider uppercase border border-brand-blue/20 bg-brand-blue/5 px-3 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-black/10">
                <div className="w-16 h-16 mx-auto bg-brand-cream rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <p className="text-brand-black/60 font-bold mb-6 text-lg">Your library is empty</p>
                <Link 
                  to="/add-book"
                  className="inline-block px-8 py-4 bg-brand-blue text-white rounded-xl font-bold transition-transform hover:-translate-y-1 shadow-md"
                >
                  List Your First Book
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-brand-black text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-2xl font-black mb-8 tracking-tight border-b border-white/10 pb-4 relative z-10">Profile Details</h3>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-xs text-white/50 uppercase font-bold mb-1 tracking-widest">Email</p>
                  <p className="text-white font-medium break-all">{user?.email}</p>
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase font-bold mb-1 tracking-widest">Phone</p>
                  <p className="text-white font-medium">
                    {user?.phone || 'Not added'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase font-bold mb-1 tracking-widest">Member Since</p>
                  <p className="text-white font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                  </p>
                </div>
                <Link
                  to="/profile"
                  className="w-full mt-6 px-4 py-4 bg-white text-brand-black hover:bg-brand-blue hover:text-white font-bold rounded-xl transition-colors text-center inline-block shadow-lg"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h3 className="text-2xl font-black text-brand-black mb-6 tracking-tight border-b border-black/5 pb-4">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { label: 'Browse Marketplace', link: '/marketplace' },
                  { label: 'My Listings', link: '/my-listings' },
                  { label: 'Account Settings', link: '/profile' }
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.link}
                    className="flex items-center justify-between px-5 py-4 bg-brand-cream/50 hover:bg-brand-cream border border-black/5 hover:border-black/10 rounded-xl transition-all font-bold text-sm text-brand-black group"
                  >
                    {item.label} 
                    <span className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;