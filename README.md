# BookSwap - Professional Book Exchange Platform

A modern, fully functional book exchange platform built with React, Node.js, and MongoDB. Users can buy, sell, and swap books with other book enthusiasts in their community.

## 🚀 Live Demo
* **Frontend:** [https://book-swap-nfhu.vercel.app](https://book-swap-nfhu.vercel.app)
* **Backend API:** [https://bookswap-backend-7daz.onrender.com](https://bookswap-backend-7daz.onrender.com)

## 🎨 Features

- **Professional Dark Theme**: Modern UI with emerald/teal color scheme
- **Landing Page**: Hero section with stats, services, and FAQs
- **User Authentication**: Secure registration and login system
- **Book Marketplace**: Browse and search books
- **Dashboard**: Track listings and earnings
- **WhatsApp Integration**: Direct messaging with sellers
- **Responsive Design**: Works perfectly on mobile and desktop
- **Real-time Status**: Track book conditions and availability

## 🛠️ Tech Stack

**Frontend:**
- React 19.2.0
- Vite
- Tailwind CSS 4.2.1
- React Router DOM 7.13.1
- Axios
- React Hot Toast

**Backend:**
- Node.js
- Express 4.18.2
- MongoDB with Mongoose 7.6.3
- JWT Authentication
- bcryptjs for password hashing
- Nodemon for development

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd BookSwap
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file with the following:
# MONGODB_URI=mongodb://localhost:27017/bookswap
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# PORT=5000
# NODE_ENV=development

# Start MongoDB (if local)
mongod

# Start development server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env.local file:
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

## 📁 Project Structure

```
BookSwap/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── bookController.js     # Book CRUD operations
│   │   ├── orderController.js    # Order management
│   │   └── userController.js     # User management
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Book.js               # Book schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   ├── index.js                  # Server entry point
│   ├── package.json
│   └── .env                      # Environment variables
│
└── client/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx         # Navigation bar
    │   │   └── BookCard.jsx       # Book card component
    │   ├── pages/
    │   │   ├── Landing.jsx        # Landing/home page
    │   │   ├── Login.jsx          # Login page
    │   │   ├── Register.jsx       # Registration page
    │   │   ├── Dashboard.jsx      # User dashboard
    │   │   ├── Marketplace.jsx    # Browse books
    │   │   ├── AddBook.jsx        # Add new book
    │   │   ├── MyListings.jsx     # My books
    │   │   ├── Profile.jsx        # User profile
    │   │   └── BookDetails.jsx    # Book detail view
    ├── App.jsx                    # Main app component
    ├── main.jsx                   # Entry point
    ├── index.css
    ├── App.css
    ├── package.json
    ├── .env.local                 # Environment variables
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── eslint.config.js
```

## 🔑 Key API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/users/register` - Register with role
- `POST /api/users/login` - Login
- `PUT /api/users/profile/role` - Update user role (protected)

### Books
- `GET /api/books` - Get all available books
- `POST /api/books` - Create new book listing (protected)
- `GET /api/books/:id` - Get book details
- `PUT /api/books/:id` - Update book (protected)
- `DELETE /api/books/:id` - Delete book (protected)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (protected)

## 🎯 User Roles

- **Buyer**: Can browse, search, and purchase books
- **Seller**: Can list books for sale and manage inventory

## 📝 Sample User Data

For testing, you can create accounts:

**Buyer Account:**
- Email: buyer@example.com
- Password: Password123

**Seller Account:**
- Email: seller@example.com
- Password: Password123

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes (middleware)
- User validation
- Error handling

## 🎨 Design System

### Colors
- **Primary**: Emerald (#10B981)
- **Secondary**: Teal (#14B8A6)
- **Background**: Black (#000000)
- **Surface**: Slate-900 (#0F172A)
- **Text**: White/Slate-300

### Components
- Modern glassmorphism effects
- Smooth animations and transitions
- Responsive grid layouts
- Professional typography

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables on hosting platform
git push heroku main
```

## 📱 Mobile Optimization

The app is fully responsive with:
- Mobile navigation menu
- Touch-friendly buttons
- Optimized images
- Fast load times

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Ensure MongoDB is running
mongod

# Check .env file has correct URI
MONGODB_URI=mongodb://localhost:27017/bookswap
```

### API Errors
- Check if backend is running on port 5000
- Verify .env variables are set correctly
- Check browser console for detailed errors

### CORS Issues
- Ensure frontend URL is in backend CORS config
- Check API endpoints match in axios calls

## 📊 Testing the App

1. **Register** - Create a new account
2. **Browse** - View books on marketplace
3. **Add Book** - List a book for sale
4. **Search** - Find books by title or author
5. **Message** - Click "Chat on WhatsApp" button
6. **Dashboard** - Track your listings

## 📈 Future Enhancements

- Rating and review system
- Order tracking
- Payment integration (Stripe/Razorpay)
- Book recommendations
- Social sharing
- Advanced filtering
- Real-time notifications

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For support, email: support@bookswap.com

---

**Made with ❤️ for book lovers everywhere**
