import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Fiction',
    price: '',
    condition: 'Good',
    description: '',
    location: 'Dehradun'
  });

  const [includedBooks, setIncludedBooks] = useState([{ title: '', author: '' }]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookChange = (index, field, value) => {
    const newBooks = [...includedBooks];
    newBooks[index][field] = value;
    setIncludedBooks(newBooks);
  };

  const addBookField = () => {
    setIncludedBooks([...includedBooks, { title: '', author: '' }]);
  };

  const removeBookField = (index) => {
    if (includedBooks.length > 1) {
      const newBooks = includedBooks.filter((_, i) => i !== index);
      setIncludedBooks(newBooks);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const payload = {
        ...formData,
        includedBooks
      };

      await axios.post('/api/books', payload, config);
      toast.success('Listing created successfully! 🎉');
      navigate('/my-listings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create listing');
      setIsSubmitting(false);
    }
  };

  const categories = ['Fiction', 'Educational', 'Programming', 'Science', 'History', 'Biography', 'Self-Help', 'Other'];
  const conditions = ['Like New', 'Good', 'Fair'];

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto pt-16">
        
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center text-brand-black/60 hover:text-brand-blue mb-8 font-bold transition-colors">
          ← Back to Marketplace
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-black/5">
          
          <div className="p-8 md:p-12">
            <div className="mb-10 text-center">
              <h1 className="text-4xl md:text-5xl font-black text-brand-black mb-3 tracking-tight">
                Create a <span className="text-brand-blue">Listing</span>
              </h1>
              <p className="text-brand-black/60 text-lg font-medium">
                List a single book or a bundle of books to share with the community
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Listing Title */}
              <div>
                <label className="block text-sm font-bold text-brand-black mb-2">
                  Listing Title (Bundle Name)
                </label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Harry Potter Collection (Books 1-3)" 
                  className="w-full bg-brand-cream/50 border border-black/10 text-brand-black px-5 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium placeholder:text-brand-black/40"
                />
              </div>

              {/* Dynamic Books Section */}
              <div className="bg-brand-cream/30 p-6 rounded-2xl border border-black/5 space-y-6">
                <div className="flex justify-between items-center border-b border-black/5 pb-4">
                  <h3 className="text-xl font-bold text-brand-black">Books in this Listing</h3>
                  <button 
                    type="button" 
                    onClick={addBookField}
                    className="text-brand-blue font-bold text-sm hover:underline"
                  >
                    + Add Another Book
                  </button>
                </div>

                {includedBooks.map((book, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-end relative group">
                    <div className="flex-1 w-full">
                      <label className="block text-xs font-bold text-brand-black mb-1">Book {index + 1} Title</label>
                      <input 
                        type="text" 
                        value={book.title}
                        onChange={(e) => handleBookChange(index, 'title', e.target.value)}
                        required
                        placeholder="Title" 
                        className="w-full bg-white border border-black/10 text-brand-black px-4 py-3 rounded-xl outline-none focus:border-brand-blue transition-all font-medium text-sm"
                      />
                    </div>
                    <div className="flex-1 w-full">
                      <label className="block text-xs font-bold text-brand-black mb-1">Author</label>
                      <input 
                        type="text" 
                        value={book.author}
                        onChange={(e) => handleBookChange(index, 'author', e.target.value)}
                        required
                        placeholder="Author" 
                        className="w-full bg-white border border-black/10 text-brand-black px-4 py-3 rounded-xl outline-none focus:border-brand-blue transition-all font-medium text-sm"
                      />
                    </div>
                    {includedBooks.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeBookField(index)}
                        className="text-brand-coral hover:text-red-600 font-bold px-2 py-3 md:pb-3"
                        title="Remove book"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Category & Condition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-brand-black mb-2">
                    Category
                  </label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-brand-cream/50 border border-black/10 text-brand-black px-5 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-brand-black mb-2">
                    Condition
                  </label>
                  <select 
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full bg-brand-cream/50 border border-black/10 text-brand-black px-5 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium"
                  >
                    {conditions.map(cond => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-brand-black mb-2">
                    Total Price (₹)
                  </label>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 299" 
                    className="w-full bg-brand-cream/50 border border-black/10 text-brand-black px-5 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium placeholder:text-brand-black/40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-brand-black mb-2">
                    Location
                  </label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Rajpur Road, Dehradun" 
                    className="w-full bg-brand-cream/50 border border-black/10 text-brand-black px-5 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium placeholder:text-brand-black/40"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-brand-black mb-2">
                  Description
                </label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the books, their condition, and any special notes..." 
                  rows="5"
                  className="w-full bg-brand-cream/50 border border-black/10 text-brand-black px-5 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium placeholder:text-brand-black/40 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl text-lg font-bold transition-all flex justify-center items-center gap-2 ${
                  isSubmitting 
                    ? 'bg-brand-black/10 text-brand-black/40 cursor-not-allowed'
                    : 'bg-brand-black text-white hover:bg-brand-blue shadow-md hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;