import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(data);
      } catch (err) { console.error(err); }
    };
    fetchDetails();
  }, [id]);

  const handleWhatsApp = () => {
    const sellerPhone = book.sellerId?.phone || "919873456785";
    const message = `Hi! I'm interested in your "${book.bundleTitle}" bundle for Class ${book.grade} on BookSwap.`;
    window.open(`https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!book) return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-950 flex items-center justify-center transition-colors">
      <div className="animate-pulse text-2xl font-bold text-slate-400">Loading Bundle Details...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-950 py-12 px-6 transition-colors font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 font-medium transition-colors">
          ← Back to Browse
        </Link>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Visual Abstract Representation */}
          <div className="md:w-2/5 bg-slate-50 dark:bg-slate-800/50 p-12 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-8 left-8">
              <span className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-sm font-bold px-4 py-2 rounded-full shadow-sm">
                Class {book.grade}
              </span>
            </div>
            
            {/* Abstract Book/Bundle Cover */}
            <div className="w-56 h-72 bg-white dark:bg-slate-800 shadow-2xl rounded-r-3xl rounded-l-sm border-l-8 border-[#dcbca8] flex items-center justify-center relative z-10 hover:-translate-y-2 transition-transform duration-500">
               <div className="text-center px-6">
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">Bundle</p>
                 <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight capitalize">
                   {book.bundleTitle}
                 </h3>
               </div>
            </div>

            {/* Soft decorative glow */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#dcbca8]/20 rounded-full blur-3xl"></div>
          </div>

          {/* Right Side: Details & Action */}
          <div className="md:w-3/5 p-10 lg:p-16 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4 gap-4">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight capitalize">
                  {book.bundleTitle}
                </h1>
                <span className="bg-[#dcbca8] text-slate-900 text-sm font-bold px-4 py-2 rounded-full whitespace-nowrap mt-2">
                  Save {book.discount || 70}%
                </span>
              </div>
              
              <p className="text-slate-500 dark:text-slate-400 text-lg mb-8">
                Complete study materials tailored for Dehradun students. Carefully verified and ready for the new academic session.
              </p>

              <div className="flex items-end gap-4 mb-10 pb-10 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Asking Price</p>
                  <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">₹{book.price}</span>
                </div>
                <div className="mb-2">
                  <span className="text-xl text-slate-400 line-through font-medium">₹{book.originalPrice || book.price * 3}</span>
                </div>
              </div>

              {/* Organized Line-by-Line Subjects */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
                  Included in this bundle
                </h3>
                {/* Grid format creates perfect 2-column or 1-column lists based on screen size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {(Array.isArray(book.bookList) ? book.bookList : book.bookList.split(',')).map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {/* Premium Checkmark SVG instead of basic dot */}
                      <svg className="w-5 h-5 text-[#dcbca8] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg font-medium text-slate-700 dark:text-slate-300 capitalize">
                        {item.trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8">
              <button 
                onClick={handleWhatsApp}
                className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-10 py-4 rounded-xl text-lg font-bold shadow-lg shadow-slate-900/10 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <span>Message Seller on WhatsApp</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
              <p className="text-sm text-slate-400 mt-4 text-center sm:text-left">
                You are connecting with a verified local student in Dehradun.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BookDetails;