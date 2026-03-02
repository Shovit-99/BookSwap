import React from 'react';

const BookCard = ({ book }) => {
  // Calculate the discount percentage to show how much the student saves
  const savings = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  // This function creates the WhatsApp link using the seller's phone number
  const contactSeller = () => {
    const sellerPhone = book.sellerId?.phone; // Pulls from the populated sellerId
    
    if (!sellerPhone) {
      alert("Seller contact information is missing!");
      return;
    }

    const message = `Hi! I'm interested in your Class ${book.grade} bundle (${book.bundleTitle}) on BookSwap. Is it still available?`;
    const whatsappUrl = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all p-5 relative group">
      {/* 1. Grade & Savings Badges */}
      <div className="flex justify-between items-center mb-4">
        <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
          Class {book.grade}
        </span>
        {savings > 0 && (
          <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg animate-pulse">
            {savings}% OFF
          </span>
        )}
      </div>

      {/* 2. Bundle Title */}
      <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
        {book.bundleTitle}
      </h3>
      
      {/* 3. 📍 Location Tracking */}
      <p className="text-blue-500 text-xs font-bold flex items-center mb-4">
        <span className="mr-1">📍</span> {book.location}
      </p>

      {/* 4. 📚 The "4-5 Books" List Section */}
      <div className="bg-slate-50 p-3 rounded-2xl mb-5 border border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bundle Includes:</p>
        <p className="text-slate-600 text-sm italic leading-relaxed">
          "{book.bookList}"
        </p>
      </div>

      {/* 5. Pricing & Action */}
      <div className="flex justify-between items-end border-t border-slate-50 pt-4">
        <div>
          <p className="text-slate-400 text-xs line-through font-bold">₹{book.originalPrice}</p>
          <p className="text-2xl font-black text-slate-900">₹{book.price}</p>
        </div>
        
        {/* Updated Contact Button */}
        <button 
          onClick={contactSeller}
          className="bg-green-500 text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-green-600 transition-all active:scale-95 shadow-lg shadow-green-100 flex items-center"
        >
          <span className="mr-2 text-base">💬</span> Contact
        </button>
      </div>
    </div>
  );
};

export default BookCard;