import React, { useState } from 'react';

const BookCard = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const sellerPhone = book.seller?.phone || "919873456785";
    const message = `Hi! I'm interested in your "${book.title}" book for ₹${book.price} on BookSwap.`;
    window.open(`https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div
      className="relative group h-[420px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#cfa168]/10 via-[#9c6a30]/10 to-[#cfa168]/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card */}
      <div className="relative premium-glass-card rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-500 hover:border-[#cfa168]/40 hover:shadow-lg hover:shadow-[#cfa168]/10 hover:-translate-y-1">

        {/* Image Section */}
        <div className="relative h-48 bg-[#0a0f1c] border-b border-[#cfa168]/20 flex items-center justify-center overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#cfa168]/30 rounded-full -translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#b28347]/30 rounded-full translate-x-16 translate-y-16 group-hover:scale-125 transition-transform duration-700" />
          </div>

          {/* Book Icon */}
          <div className="relative z-10 text-center transform transition-all duration-500 group-hover:scale-110 drop-shadow-xl">
            <span className="text-6xl" style={{ filter: 'sepia(1) hue-rotate(10deg) saturate(2)' }}>📖</span>
          </div>

          {/* Price Badge */}
          <div className="absolute top-3 right-3 bg-[#b28347]/90 text-[#050810] px-3 py-1.5 rounded-lg text-sm font-black border border-[#fbe5b8]/30 backdrop-blur-md">
            ₹{book.price}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-4 space-y-3">
          {/* Title */}
          <div>
            <h3 className="font-black text-white text-sm leading-tight group-hover:text-[#cfa168] transition-colors line-clamp-2">
              {book.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              by {book.author}
            </p>
          </div>

          {/* Info Tags */}
          <div className="flex gap-2 flex-wrap text-xs">
            <span className="px-2 py-1 bg-[#cfa168]/20 text-[#fbe5b8] rounded border border-[#cfa168]/30">
              {book.category}
            </span>
            <span className={`px-2 py-1 rounded border ${
              book.condition === 'Like New' ? 'bg-[#cfa168]/30 border-[#cfa168]/50 text-white' :
              book.condition === 'Good' ? 'bg-blue-500/20 border-blue-500/30 text-blue-200' :
              'bg-slate-700/50 border-slate-600 text-slate-300'
            }`}>
              {book.condition}
            </span>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-700/50">
            <div className="w-6 h-6 bg-gradient-to-br from-[#cfa168] to-[#9c6a30] rounded-full flex items-center justify-center">
              <span className="text-[#050810] text-xs font-black">
                {book.seller?.name?.charAt(0) || 'S'}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              {book.seller?.name || 'Seller'}
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleWhatsApp}
            className="mt-auto w-full premium-btn py-2.5 rounded-lg text-sm flex items-center justify-center gap-2"
          >
            <span>💬</span>
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;