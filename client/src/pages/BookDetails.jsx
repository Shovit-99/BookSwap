import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const sellerPhone = book.sellerId?.phone || "919873456785"; // Fallback to your test number
    const message = `Hi! I'm interested in your "${book.bundleTitle}" bundle for Class ${book.grade} on BookSwap.`;
    window.open(`https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!book) return <div className="p-20 text-white font-black text-4xl">LOADING DETAILS...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6 transition-colors font-['Inter']">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row">
          
          {/* Left Side: Visual & Price */}
          <div className="md:w-1/2 p-10 bg-slate-50 dark:bg-slate-800/50 flex flex-col justify-between">
            <div>
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Class {book.grade}
              </span>
              <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mt-6 leading-tight">
                {book.bundleTitle}
              </h1>
            </div>

            <div className="mt-12">
              <p className="text-slate-400 font-semibold text-sm uppercase">Current Valuation</p>
              <div className="flex items-baseline gap-4">
                <span className="text-6xl font-black text-slate-900 dark:text-white">₹{book.price}</span>
                <span className="text-2xl text-slate-400 line-through">₹{book.originalPrice}</span>
              </div>
              <div className="mt-2 inline-block bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg font-bold text-sm">
                Save 70% Today ⚡
              </div>
            </div>
          </div>

          {/* Right Side: Subjects & Action */}
{/* Right Side Card: Subject List */}
{/* Right Side Card: Subject List */}
<div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800">
  <h3 className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">
    INCLUDED IN THIS BUNDLE:
  </h3>

  {/* flex-col + gap-5 ensures each subject is on its own line */}
  <div className="flex flex-col gap-5">
    {(Array.isArray(book.bookList) ? book.bookList : book.bookList.split(',')).map((item, i) => (
      <div key={i} className="flex items-center gap-4 py-1">
        {/* Professional Dot Indicator */}
        <div className="h-2.5 w-2.5 bg-blue-600 rounded-full shrink-0" />
        
        <p className="text-2xl font-bold text-slate-700 dark:text-slate-200 capitalize leading-none">
          {item.trim()}
        </p>
      </div>
    ))}
  </div>

  <button 
    onClick={handleWhatsApp}
    className="w-full mt-12 bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl text-xl font-black shadow-lg shadow-green-500/20 transition-all active:scale-95"
  >
    Contact Seller on WhatsApp
  </button>
</div>
        </div>
      </div>
    </div>
  );
};
export default BookDetails;