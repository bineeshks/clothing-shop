# Vellora Admin Dashboard Setup

## Overview

The Vellora admin dashboard provides a complete management interface for:
- **Dashboard**: View real-time analytics and key metrics
- **Product Management**: Create, read, update, and delete products
- **Order Management**: View and manage customer orders
- **User Authentication**: Secure JWT-based admin login

## Prerequisites

Before setting up the admin dashboard, you need:
1. Node.js (v18+) and pnpm
2. MongoDB instance (local or cloud)
3. Environment variables configured

## Setup Instructions

### 1. Install Dependencies

Dependencies are already installed in `package.json`:
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```
MONGODB_URI=mongodb://localhost:27017/vellora
JWT_SECRET=your-very-secure-secret-key-change-this
```

**For Production:**
- Use a MongoDB Atlas cloud instance
- Change `JWT_SECRET` to a strong random string
- Set `NODE_ENV=production`

### 3. Seed Demo Data

Run the seed script to create the demo admin account and sample data:

```bash
node scripts/seed.js
```

This creates:
- **Admin Account**: `admin@vellora.com` / `admin123`
- **Sample Products**: 8 ethical fashion items
- **Sample Orders**: 5 orders with different statuses

### 4. Access the Admin Panel

1. Start the dev server: `pnpm dev`
2. Navigate to: `http://localhost:3000/admin/login`
3. Login with:
   - Email: `admin@vellora.com`
   - Password: `admin123`

## Features

### Dashboard Overview
- **Total Products**: Count of all products in inventory
- **Total Orders**: Number of orders received
- **Total Revenue**: Sum of all order amounts
- **Pending Orders**: Orders waiting to be processed
- **Recent Orders**: List of 5 most recent orders
- **Order Status Breakdown**: Orders by status (pending, processing, shipped, delivered, cancelled)

### Product Management

#### View Products
- Access at `/admin/products`
- Table view with:
  - Product name and image thumbnail
  - Category, price, stock status
  - Creation date
  - Edit/Delete actions

#### Create Product
- Access at `/admin/products/new`
- Form fields:
  - Product name and description
  - Price and stock quantity
  - Category (Dresses, Accessories, Outerwear)
  - Colors and sizes (comma-separated)
  - Rating and review count
  - Image selection from 6 placeholder options

#### Edit Product
- Access at `/admin/products/[id]/edit`
- Update all product information
- Change product image
- Modify pricing and stock

#### Delete Product
- Click delete button in products table
- Confirmation dialog before deletion

### Order Management

#### View Orders
- Access at `/admin/orders`
- Table showing:
  - Customer name and email
  - Order amount
  - Current status with color coding
  - Order date

#### Order Details
- Access at `/admin/orders/[id]`
- View complete order information:
  - Customer details (name, email, phone)
  - Shipping address
  - List of ordered items with quantities and prices
  - Order total

#### Update Order Status
- Change status from dropdown
- Available statuses:
  - `pending` - New order awaiting processing
  - `processing` - Being prepared for shipment
  - `shipped` - In transit to customer
  - `delivered` - Received by customer
  - `cancelled` - Order cancelled

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new user
- `POST /api/auth/logout` - Logout and clear session

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Orders
- `GET /api/orders` - Get all orders (admin only)
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order by ID
- `PUT /api/orders/[id]` - Update order status (admin only)

### Dashboard
- `GET /api/admin/stats` - Get dashboard statistics (admin only)

## Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  password: String (hashed, required),
  name: String (required),
  role: String ('admin' or 'customer'),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (required, enum: ['Dresses', 'Accessories', 'Outerwear']),
  image: String (required),
  rating: Number (0-5),
  reviews: Number,
  colors: [String],
  sizes: [String],
  stock: Number (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  customerName: String (required),
  customerEmail: String (required),
  customerPhone: String (required),
  items: [
    {
      productId: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number (required),
  status: String ('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
  shippingAddress: String (required),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

✓ **Password Hashing**: Bcryptjs with salt rounds = 10
✓ **JWT Authentication**: 24-hour token expiration
✓ **HTTP-Only Cookies**: Secure token storage
✓ **Role-Based Access Control**: Admin-only endpoints
✓ **Input Validation**: Mongoose schema validation
✓ **Environment Variables**: Secrets not in code

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running locally or provide a valid `MONGODB_URI`
- For local: `mongod` command should be running
- For Atlas: Check connection string in `.env.local`

### "Login unsuccessful"
- Verify admin account exists: Check MongoDB `users` collection
- Run seed script: `node scripts/seed.js`
- Clear browser cookies and try again

### "Unauthorized" error
- JWT token may have expired (24-hour expiration)
- Login again to get a new token
- Ensure you're logged in as an admin user

### Products not loading
- Check MongoDB connection
- Verify products exist in database
- Check browser console for error messages

## Production Deployment

For production deployment:

1. **Database**:
   - Use MongoDB Atlas or similar cloud service
   - Update `MONGODB_URI` environment variable

2. **Secrets**:
   - Change `JWT_SECRET` to a strong random string
   - Store in secure environment variable management system

3. **HTTPS**:
   - Ensure site runs on HTTPS
   - Cookie settings auto-update for production

4. **Rate Limiting**:
   - Implement rate limiting on auth endpoints
   - Consider using reverse proxy (Nginx, Cloudflare)

5. **Monitoring**:
   - Set up error tracking (Sentry, etc.)
   - Monitor database performance
   - Set up alerts for failed login attempts

## Next Steps

- Customize branding and colors
- Add more product categories
- Implement email notifications
- Add user roles and permissions
- Integrate payment processing
- Add inventory alerts

## Support

For issues or questions, refer to:
- MongoDB Docs: https://docs.mongodb.com
- JWT Auth: https://jwt.io
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
