import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(`/api/books/${id}`);
        setBook(data);
      } catch (err) { console.error(err); }
    };
    fetchDetails();
  }, [id]);

  const handleWhatsApp = () => {
    const sellerPhone = book.seller?.phone || "919873456785";
    const message = `Hi! I'm interested in your "${book.title}" book for ₹${book.price} on BookSwap.`;
    window.open(`https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!book) return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto pt-10">
        
        {/* Breadcrumb Navigation */}
        <Link to="/" className="inline-flex items-center text-brand-black/60 hover:text-brand-blue mb-8 font-bold transition-colors">
          ← Back to Browse
        </Link>

        {/* Main Content Card */}
        <div className="bg-white rounded-[3rem] shadow-xl border border-black/5 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Visual Abstract Representation */}
          <div className="md:w-2/5 bg-brand-cream border-r border-black/5 p-12 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-8 left-8">
              <span className="bg-white text-brand-black text-sm font-bold px-4 py-2 rounded-full shadow-sm border border-black/5">
                {book.condition || 'Good'}
              </span>
            </div>
            
            {/* Abstract Book/Bundle Cover */}
            <div className="w-64 h-80 bg-brand-blue shadow-2xl rounded-r-3xl rounded-l-sm border-l-8 border-brand-black flex items-center justify-center relative z-10 hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
               <div className="text-center px-6 relative z-10">
                 <p className="text-xs text-white/70 font-bold uppercase tracking-widest mb-2">{book.category || 'Book'}</p>
                 <h3 className="text-3xl font-black text-white leading-tight capitalize">
                   {book.title}
                 </h3>
                 {book.includedBooks && book.includedBooks.length > 0 ? (
                   <p className="text-sm font-bold text-white/90 mt-4">Bundle of {book.includedBooks.length} Books</p>
                 ) : (
                   <p className="text-sm font-bold text-white/90 mt-4">by {book.author}</p>
                 )}
               </div>
            </div>

            {/* Soft decorative glow */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          {/* Right Side: Details & Action */}
          <div className="md:w-3/5 p-10 lg:p-16 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4 gap-4">
                <h1 className="text-4xl md:text-5xl font-black text-brand-black leading-tight tracking-tight capitalize">
                  {book.title}
                </h1>
              </div>
              
              <p className="text-brand-black/60 font-medium text-lg mb-8">
                {book.description || 'A great book available for swap or purchase from our community members.'}
              </p>

              <div className="flex items-end gap-4 mb-10 pb-10 border-b border-black/5">
                <div>
                  <p className="text-sm text-brand-black/50 font-bold uppercase tracking-widest mb-1">Asking Price</p>
                  <span className="text-6xl font-black text-brand-black tracking-tight">₹{book.price}</span>
                </div>
              </div>

              {/* Details List */}
              <div>
                <h3 className="text-sm font-bold text-brand-black/50 uppercase tracking-widest mb-6">
                  {book.includedBooks && book.includedBooks.length > 0 ? 'Bundle Contents & Details' : 'Book Details'}
                </h3>
                
                {book.includedBooks && book.includedBooks.length > 0 && (
                  <div className="mb-8">
                    <span className="text-xs text-brand-black/50 uppercase font-bold mb-3 block tracking-widest">Included Books</span>
                    <ul className="space-y-3">
                      {book.includedBooks.map((includedBook, idx) => (
                        <li key={idx} className="flex flex-col bg-brand-cream/30 p-3 rounded-lg border border-black/5">
                          <span className="font-bold text-brand-black text-lg">{includedBook.title}</span>
                          <span className="text-sm text-brand-black/60 font-medium">by {includedBook.author}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  {(!book.includedBooks || book.includedBooks.length === 0) && (
                    <div className="flex flex-col">
                      <span className="text-xs text-brand-black/50 uppercase font-bold mb-1 tracking-widest">Author</span>
                      <span className="text-lg font-black text-brand-black">{book.author}</span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs text-brand-black/50 uppercase font-bold mb-1 tracking-widest">Category</span>
                    <span className="text-lg font-black text-brand-black">{book.category || 'Fiction'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-brand-black/50 uppercase font-bold mb-1 tracking-widest">Condition</span>
                    <span className="text-lg font-black text-brand-black">{book.condition || 'Good'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-brand-black/50 uppercase font-bold mb-1 tracking-widest">Location</span>
                    <span className="text-lg font-black text-brand-black">{book.location || 'Dehradun'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8">
              <button 
                onClick={handleWhatsApp}
                className="w-full sm:w-auto bg-brand-black text-white hover:bg-brand-blue px-10 py-5 rounded-full text-lg font-bold flex items-center justify-center gap-3 shadow-xl transition-all hover:-translate-y-1"
              >
                <span>Message Seller on WhatsApp</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
              <p className="text-sm text-brand-black/50 font-bold mt-4 text-center sm:text-left">
                You are connecting with a verified BookSwap member.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BookDetails;