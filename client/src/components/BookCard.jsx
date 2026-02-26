const BookCard = ({ book, isProfile, onDelete }) => {
  // Calculate savings percentage
  const savings = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden relative">
      {savings > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
          {savings}% OFF
        </div>
      )}
      
      {/* ... existing card UI ... */}

      <div className="p-4">
        <h3 className="font-bold">{book.title} (Class {book.grade})</h3>
        <p className="text-gray-500 text-sm">${book.price} <span className="line-through text-xs">${book.originalPrice}</span></p>
        
        {isProfile && (
          <button 
            onClick={() => onDelete(book._id)}
            className="mt-4 w-full bg-red-100 text-red-600 font-bold py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all"
          >
            Delete Listing
          </button>
        )}
      </div>
    </div>
  );
};
export default BookCard;