import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';

const Landing = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');

  // ---------- FAQ Data ----------
  const faqs = [
    {
      q: 'How do I list my books for trading?',
      a: 'Simply create an account, click "Add Book", fill in details like title, author, condition, and upload photos. Your book will be live on the marketplace instantly.',
    },
    {
      q: 'Is BookSwap free to use?',
      a: 'Yes! BookSwap is completely free. There are no listing fees, no hidden charges — just connect and swap.',
    },
    {
      q: 'How does the swapping process work?',
      a: 'Browse the marketplace, find a book you love, and send a swap request to the owner. You can propose trading one of your books in return.',
    },
    {
      q: 'What condition should my books be in?',
      a: 'We accept books in any readable condition. Honestly describe the condition — New, Like New, Good, or Fair.',
    },
  ];

  const bookImages = [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1629196914595-df63283f5139?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614113489855-66422ad300a4?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop"
  ];

  return (
    <div className="bg-brand-cream text-brand-black min-h-screen font-sans">
      
      {/* ========== Navbar ========== */}
      <div className="absolute top-4 inset-x-0 z-50 px-4 md:px-8 font-sans">
        <nav className="bg-white border border-black/5 shadow-sm max-w-7xl mx-auto rounded-xl">
          <div className="px-6 py-4 flex justify-between items-center">
            <Logo className="w-10 h-10" />

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-brand-black hover:text-brand-blue font-bold text-sm transition-colors flex items-center gap-1">Home <span className="text-xs">▼</span></a>
              <a href="#about" className="text-brand-black/70 hover:text-brand-blue font-bold text-sm transition-colors">About</a>
              <Link to="/marketplace" className="text-brand-black/70 hover:text-brand-blue font-bold text-sm transition-colors">Shop</Link>
              <a href="#pages" className="text-brand-black/70 hover:text-brand-blue font-bold text-sm transition-colors flex items-center gap-1">Pages <span className="text-xs">▼</span></a>
              <Link to="/profile" className="text-brand-black/70 hover:text-brand-blue font-bold text-sm transition-colors">Cart (0)</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
                   <span className="text-xs">⚙️</span>
                </button>
                <button className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
                   <span className="text-xs font-bold">X</span>
                </button>
                <button className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
                   <span className="text-xs font-bold text-brand-blue">in</span>
                </button>
              </div>
              <Link to="/marketplace" className="bg-brand-blue text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-brand-blue/90 transition-colors flex items-center gap-2 shadow-md">
                Find A Book ↗
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-black/5 text-xl font-bold">
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-black/10 p-4 space-y-4">
              <Link to="/marketplace" className="block text-center font-bold">Shop</Link>
              <Link to="/login" className="block text-center bg-brand-blue text-white py-2 rounded-lg font-bold w-full">Log In</Link>
            </div>
          )}
        </nav>
      </div>

      {/* ========== Centered Editorial Hero ========== */}
      <section className="pt-40 px-6 max-w-7xl mx-auto overflow-hidden text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="z-10 relative"
        >
          {/* Removed Avatar per user request */}
          
          <p className="text-brand-black font-bold mb-4">
            Hi, Welcome to <span className="text-brand-blue">BookSwap</span>.
          </p>

          <h1 className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto">
            The Ultimate Book Network That Captivates & Inspires.
          </h1>
          
          <p className="text-sm text-brand-black/60 max-w-2xl mx-auto mb-10 font-medium leading-relaxed uppercase tracking-wider">
            Journey into a world where words weave magic, and tales transcend time. Here, book readers and collectors are not merely traders but architects of imagination.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/marketplace" className="bg-brand-blue text-white text-sm font-bold px-8 py-3.5 rounded-lg flex items-center gap-2 hover:bg-brand-blue/90 transition-colors shadow-lg">
              Discover Now ↗
            </Link>
            <Link to="/register" className="bg-white text-brand-black text-sm font-bold px-8 py-3.5 rounded-lg border border-black/5 hover:bg-black/5 transition-colors shadow-sm">
              Let's Swap
            </Link>
          </div>
        </motion.div>

        {/* Books Image Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 flex justify-center items-end gap-4 overflow-hidden h-[400px]"
        >
          <div className="flex flex-col gap-4 w-40 transform translate-y-12 hover:-translate-y-2 transition-transform duration-500">
            <img src={bookImages[0]} alt="Book" className="w-full h-56 object-cover rounded-xl shadow-lg border border-black/10" />
            <img src={bookImages[1]} alt="Book" className="w-full h-48 object-cover rounded-xl shadow-lg border border-black/10" />
          </div>
          <div className="flex flex-col gap-4 w-44 transform translate-y-24 hover:-translate-y-2 transition-transform duration-500">
            <img src={bookImages[2]} alt="Book" className="w-full h-64 object-cover rounded-xl shadow-lg border border-black/10" />
            <img src={bookImages[3]} alt="Book" className="w-full h-40 object-cover rounded-xl shadow-lg border border-black/10" />
          </div>
          <div className="w-72 transform translate-y-8 z-10 hover:-translate-y-4 transition-transform duration-500">
            <img src={bookImages[4]} alt="Book" className="w-full h-[380px] object-cover rounded-2xl shadow-2xl border-4 border-white" />
          </div>
          <div className="flex flex-col gap-4 w-44 transform translate-y-16 hover:-translate-y-2 transition-transform duration-500">
            <img src={bookImages[5]} alt="Book" className="w-full h-52 object-cover rounded-xl shadow-lg border border-black/10" />
            <img src={bookImages[6]} alt="Book" className="w-full h-52 object-cover rounded-xl shadow-lg border border-black/10" />
          </div>
          <div className="flex flex-col gap-4 w-40 transform translate-y-32 hover:-translate-y-2 transition-transform duration-500">
            <img src={bookImages[7]} alt="Book" className="w-full h-48 object-cover rounded-xl shadow-lg border border-black/10" />
            <img src={bookImages[0]} alt="Book" className="w-full h-48 object-cover rounded-xl shadow-lg border border-black/10" />
          </div>
        </motion.div>
      </section>

      {/* ========== Connecting Dark Section ========== */}
      <section className="bg-brand-black text-white pt-24 pb-32 px-6 relative -mt-[150px] z-20">
        <div className="max-w-7xl mx-auto">
          {/* Removed Controls/Arrows per user request */}

          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold text-white/50 mb-8">Trusted By Readers World Wide</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
              {/* Dummy partner logos using text for now */}
              <span className="text-xl font-bold font-serif italic">Vertigo</span>
              <span className="text-xl font-bold">Sitemark</span>
              <span className="text-xl font-bold flex items-center gap-1"><span>♣</span> ProNature</span>
              <span className="text-xl font-bold">umbrella</span>
              <span className="text-xl font-bold">Snowflake</span>
            </div>
          </div>

          {/* Large text intro */}
          <div className="max-w-4xl mx-auto mt-24 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              The platform that changes your reading lifetime, the art of book swapping <span className="border-b-2 border-white pb-1">BookSwap</span> path to literary success.
            </h2>
          </div>

          {/* Bio/Stats Tabs Layout */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Left Tabs */}
            <div className="space-y-4">
              <button 
                onClick={() => setActiveTab('mission')}
                className={`w-full text-left px-6 py-4 rounded-xl font-bold border transition-colors ${activeTab === 'mission' ? 'bg-white/10 text-white border-white/10' : 'text-white/50 border-transparent hover:bg-white/5'}`}
              >
                Our Mission
              </button>
              <button 
                onClick={() => setActiveTab('how')}
                className={`w-full text-left px-6 py-4 rounded-xl font-bold border transition-colors ${activeTab === 'how' ? 'bg-white/10 text-white border-white/10' : 'text-white/50 border-transparent hover:bg-white/5'}`}
              >
                How It Works
              </button>
              <button 
                onClick={() => setActiveTab('stats')}
                className={`w-full text-left px-6 py-4 rounded-xl font-bold border transition-colors ${activeTab === 'stats' ? 'bg-white/10 text-white border-white/10' : 'text-white/50 border-transparent hover:bg-white/5'}`}
              >
                Community Stats
              </button>
            </div>

            {/* Right Content Area */}
            <div className="md:col-span-2 bg-[#fbe7f3] rounded-3xl p-8 md:p-12 text-brand-black min-h-[350px]">
              <AnimatePresence mode="wait">
                {activeTab === 'mission' && (
                  <motion.div key="mission" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-black">Explore Our Mission -</h3>
                      <span className="text-4xl">✍️</span>
                    </div>
                    <p className="text-brand-black/70 font-medium mb-6 leading-relaxed text-sm">
                      In the grand tapestry of literature, every thread is a story, each color a unique voice. We believe books are meant to be shared, read, and loved by as many people as possible.
                    </p>
                    <p className="text-brand-black/70 font-medium leading-relaxed text-sm">
                      Our mission is to highlight these voices, showcasing the incredible diversity and power of written expression, from bestselling novelists to emerging storytellers, by making books accessible to everyone through swapping.
                    </p>
                  </motion.div>
                )}
                {activeTab === 'how' && (
                  <motion.div key="how" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-black">How It Works -</h3>
                      <span className="text-4xl">🔄</span>
                    </div>
                    <p className="text-brand-black/70 font-medium mb-6 leading-relaxed text-sm">
                      BookSwap makes it incredibly easy to refresh your library without spending a dime. Once you create an account, you can list the books you've already read.
                    </p>
                    <p className="text-brand-black/70 font-medium leading-relaxed text-sm">
                      Browse the marketplace to find books you want. When you find one, send a swap request to the owner. If they accept, you ship your books to each other and enjoy your new stories!
                    </p>
                  </motion.div>
                )}
                {activeTab === 'stats' && (
                  <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-black">Community Stats -</h3>
                      <span className="text-4xl">📈</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-8">
                      <div>
                        <h4 className="text-4xl font-black text-brand-blue mb-2">10k+</h4>
                        <p className="text-xs font-bold text-brand-black/60 uppercase tracking-wider">Active Swappers</p>
                      </div>
                      <div>
                        <h4 className="text-4xl font-black text-brand-blue mb-2">50k+</h4>
                        <p className="text-xs font-bold text-brand-black/60 uppercase tracking-wider">Books Swapped</p>
                      </div>
                      <div>
                        <h4 className="text-4xl font-black text-brand-blue mb-2">150+</h4>
                        <p className="text-xs font-bold text-brand-black/60 uppercase tracking-wider">Countries</p>
                      </div>
                      <div>
                        <h4 className="text-4xl font-black text-brand-blue mb-2">$0</h4>
                        <p className="text-xs font-bold text-brand-black/60 uppercase tracking-wider">Listing Fees</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ Section ========== */}
      <section id="faq" className="py-32 px-6 bg-brand-cream relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-brand-black">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm transition-all">
                <button
                  className="w-full px-8 py-6 text-left flex justify-between items-center text-xl font-bold text-brand-black focus:outline-none"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  {faq.q}
                  <span className={`transform transition-transform text-2xl ${activeFaq === idx ? 'rotate-180' : ''}`}>↓</span>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-6 text-brand-black/70 font-medium text-lg leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Footer ========== */}
      <footer className="bg-white text-brand-black pt-20 pb-10 px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <Logo className="w-10 h-10 mb-4" />
              <p className="text-brand-black/60 max-w-md font-medium text-lg">The premium marketplace for book lovers. Trade, discover, and connect with readers worldwide.</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-6">Product</h4>
              <ul className="space-y-4 font-medium text-brand-black/70">
                <li><Link to="/marketplace" className="hover:text-brand-blue transition-colors">Marketplace</Link></li>
                <li><Link to="/add-book" className="hover:text-brand-blue transition-colors">List a Book</Link></li>
                <li><a href="#faq" className="hover:text-brand-blue transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-6">Support</h4>
              <ul className="space-y-4 font-medium text-brand-black/70">
                <li><a href="#faq" className="hover:text-brand-blue transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/10 pt-8 flex justify-between items-center text-brand-black/50 font-medium">
            <p>© {new Date().getFullYear()} BookSwap. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="cursor-pointer hover:text-brand-blue">𝕏</span>
              <span className="cursor-pointer hover:text-brand-blue">In</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
