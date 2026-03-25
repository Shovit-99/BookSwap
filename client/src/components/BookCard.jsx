import React from 'react';

const BookCard = ({ book }) => {
  const handleWhatsApp = (e) => {
    e.preventDefault(); 
    const sellerPhone = book.seller?.phone || "919873456785";
    const message = `Hi! I'm interested in your "${book.bundleTitle}" bundle for Class ${book.grade} on BookSwap.`;
    window.open(`https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const subjects = typeof book.bookList === 'string' 
    ? book.bookList.split(',') 
    : Array.isArray(book.bookList) && book.bookList.length === 1 
      ? book.bookList[0].split(',') 
      : book.bookList || [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-[#e5e0d8] dark:border-slate-800 flex flex-col h-[420px] overflow-hidden hover:shadow-md transition-all duration-300 p-4">
      
      {/* Top Image/Placeholder Area */}
      <div className="bg-[#6b8b9f] dark:bg-slate-800 rounded-lg h-32 mb-4 flex items-center justify-center relative overflow-hidden shrink-0 transition-colors">
        <div className="text-center z-10 px-2">
          <h3 className="text-white font-bold text-lg leading-tight capitalize">
            Class {book.grade}
          </h3>
          <p className="text-white/80 text-xs mt-1">Dehradun Region</p>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-1 capitalize transition-colors">
          {book.bundleTitle}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 transition-colors">
          from {book.seller?.name || 'Local Student'}
        </p>

        {/* Bullet Points */}
        <ul className="text-xs text-slate-800 dark:text-slate-300 space-y-1 mb-4 flex-grow list-disc pl-4 marker:text-slate-400 dark:marker:text-slate-500 transition-colors">
          {subjects.slice(0, 4).map((subject, index) => (
            <li key={index} className="capitalize">{subject.trim()}</li>
          ))}
          {subjects.length > 4 && (
             <li className="text-slate-500 dark:text-slate-400 list-none -ml-4 italic">+ {subjects.length - 4} more</li>
          )}
        </ul>

        {/* Condition & Price */}
        <div className="mt-auto">
          <p className="text-xs text-slate-800 dark:text-slate-300 mb-1 transition-colors">
            Condition: {book.condition || 'Good'}
          </p>
          <p className="text-xs text-slate-800 dark:text-slate-300 mb-2 transition-colors">
            Location: {book.location || 'Dehradun Region'}
          </p>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-slate-400 dark:text-slate-500 line-through text-sm transition-colors">₹{book.originalPrice || book.price * 3}</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white transition-colors">₹{book.price}</span>
          </div>

          {/* Green WhatsApp Button */}
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-[#7bc4a6] hover:bg-[#68ac90] dark:bg-[#68ac90] dark:hover:bg-[#5a9c80] text-white py-2 rounded-md text-sm font-bold transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;