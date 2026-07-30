# BookSwap Server - Setup Guide

This is the backend API for the BookSwap application.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the server root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/bookswap

# JWT Secret (Change this in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string
4. Replace `MONGODB_URI` in `.env` with your connection string

Example:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookswap?retryWrites=true&w=majority
```

### 4. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### User Management
- `POST /api/users/` - Create user (with role)
- `POST /api/users/login` - User login
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `PUT /api/users/profile/role` - Toggle user role

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Create book (requires auth)
- `GET /api/books/:id` - Get book by ID
- `PUT /api/books/:id` - Update book (requires auth)
- `DELETE /api/books/:id` - Delete book (requires auth)

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order

## Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Auth logic
│   ├── bookController.js     # Book CRUD
│   ├── orderController.js    # Order management
│   └── userController.js     # User management
├── middleware/
│   └── authMiddleware.js     # JWT verification
├── models/
│   ├── User.js               # User schema
│   ├── Book.js               # Book schema
│   └── Order.js              # Order schema
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   ├── orderRoutes.js
│   └── userRoutes.js
├── index.js                  # Server entry point
├── package.json
├── .env                      # Environment variables (not committed)
└── .gitignore
```

## Available Scripts

```bash
# Start development server (with hot reload)
npm run dev

# Start production server
npm start

# Stop server
Ctrl + C
```

## Testing API Endpoints

### Using Postman
1. Download Postman from https://www.postman.com/downloads/
2. Import the API endpoints
3. Set environment variables for URLs
4. Test each endpoint

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123",
    "phone": "9876543210",
    "role": "buyer"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

## Database Models

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (buyer/seller),
  createdAt: Date,
  updatedAt: Date
}
```

### Book Schema
```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  category: String,
  price: Number,
  condition: String (Like New/Good/Fair),
  description: String,
  image: String (URL),
  seller: ObjectId (ref: User),
  location: String,
  isSold: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

All errors return JSON with:
```javascript
{
  message: "Error message"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

## Security Features

- **Password Hashing**: Uses bcryptjs (10 salt rounds)
- **JWT Authentication**: 30-day expiration
- **Protected Routes**: Authentication middleware on sensitive endpoints
- **CORS**: Enabled for frontend communication
- **Validation**: Input validation on all endpoints

## Deployment

### Deploy to Heroku
1. Install Heroku CLI
2. Run: `heroku login`
3. Create app: `heroku create your-app-name`
4. Add MongoDB URL: `heroku config:set MONGODB_URI=your_url`
5. Add JWT Secret: `heroku config:set JWT_SECRET=your_secret`
6. Deploy: `git push heroku main`

### Deploy to Railway
1. Connect GitHub repository
2. Add environment variables in dashboard
3. Deploy automatically on git push

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For MongoDB Atlas, whitelist your IP address

### JWT Token Issues
```
Error: jwt malformed
```
- Ensure token is passed in header: `Authorization: Bearer <token>`
- Check JWT_SECRET matches in .env

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
- Frontend URL should be added to CORS whitelist
- Check index.js for CORS configuration

## Performance Tips

- Use MongoDB indexes on frequently queried fields
- Implement pagination for large datasets
- Cache frequently accessed data
- Monitor API response times

## Next Steps

- Add payment processing (Stripe/Razorpay)
- Implement real-time notifications
- Add email verification
- Set up automated backups
- Add rate limiting

---

For frontend setup, see [../client/README.md](../client/README.md)
