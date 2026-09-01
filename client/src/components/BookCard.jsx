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
      className="relative group h-full flex flex-col cursor-pointer premium-card overflow-hidden p-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-56 bg-brand-cream flex items-center justify-center overflow-hidden shrink-0 group-hover:bg-brand-cream/80 transition-colors">
        {/* Book Icon / Placeholder Image */}
        <div className="relative z-10 text-center transform transition-transform duration-500 group-hover:scale-110 drop-shadow-md">
          <span className="text-7xl">📖</span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white text-brand-black px-4 py-1.5 rounded-full text-sm font-black border border-black/5 shadow-sm z-20">
          ₹{book.price}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 space-y-4">
        {/* Title */}
        <div>
          <h3 className="font-black text-brand-black text-lg leading-tight group-hover:text-brand-blue transition-colors line-clamp-2">
            {book.title}
          </h3>
          {book.includedBooks && book.includedBooks.length > 0 ? (
            <p className="text-sm font-bold text-brand-blue mt-1">
              Bundle of {book.includedBooks.length} Books
            </p>
          ) : (
            <p className="text-sm font-medium text-brand-black/60 mt-1">
              by {book.author}
            </p>
          )}
        </div>

        {/* Info Tags */}
        <div className="flex gap-2 flex-wrap text-xs font-bold">
          {book.includedBooks && book.includedBooks.length > 0 && (
            <span className="px-3 py-1.5 bg-brand-blue text-white rounded-full">
              Bundle
            </span>
          )}
          <span className="px-3 py-1.5 bg-brand-cream text-brand-black/80 rounded-full">
            {book.category}
          </span>
          <span className={`px-3 py-1.5 rounded-full ${
            book.condition === 'Like New' ? 'bg-brand-blue/10 text-brand-blue' :
            book.condition === 'Good' ? 'bg-brand-green/10 text-brand-green' :
            'bg-brand-black/5 text-brand-black/60'
          }`}>
            {book.condition}
          </span>
        </div>

        {/* Seller Info & CTA */}
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-black/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-black rounded-full flex items-center justify-center text-white text-xs font-bold">
              {book.seller?.name?.charAt(0) || 'S'}
            </div>
            <span className="text-sm font-bold text-brand-black/70">
              {book.seller?.name || 'Seller'}
            </span>
          </div>

          <button
            onClick={handleWhatsApp}
            className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors group/btn border border-black/5"
            title="Chat on WhatsApp"
          >
            <span className="text-lg group-hover/btn:scale-110 transition-transform">💬</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;