import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="flex flex-col h-full group cursor-pointer">
      {/* Imagined "Book Cover" area with soft pastel background */}
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 h-64 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
        
        {/* Badges */}
        <div className="flex justify-between items-start relative z-10">
          <span className="bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
            Class {book.grade}
          </span>
          <span className="bg-[#dcbca8] text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {book.discount || 70}% OFF
          </span>
        </div>

        {/* Placeholder for Book Cover Art/Typography */}
        <div className="text-center relative z-10 mt-auto">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight mb-2 capitalize">
            {book.bundleTitle}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-widest">
            Dehradun Region
          </p>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 dark:bg-black/10 rounded-full blur-2xl group-hover:bg-[#dcbca8]/30 transition-colors"></div>
      </div>

      {/* Details below the "Cover" */}
      <div className="pt-4 px-1">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
          Study Bundle
        </p>
        <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight truncate">
          {book.bundleTitle}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-slate-900 dark:text-white">₹{book.price}</span>
          <span className="text-sm text-slate-400 line-through">₹{book.originalPrice || book.price * 3}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;