# QuickCart - E-commerce Application

QuickCart is a modern, full-stack e-commerce application built with Next.js 15, React, MongoDB, and Clerk authentication. It features a comprehensive shopping experience with product browsing, cart management, secure checkout, and order tracking.

## 🚀 Tech Stack

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Clerk
- **Image Storage:** Cloudinary
- **Background Jobs:** Inngest (for order processing)
- **Notifications:** React Hot Toast

## 📂 Folder Structure

```
QuickCart/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes
│   │   ├── cart/           # Cart management endpoints
│   │   ├── order/          # Order processing endpoints
│   │   ├── product/        # Product management endpoints
│   │   ├── seed/           # Database seeding endpoint
│   │   └── user/           # User data endpoints
│   ├── (pages)/            # Application pages
│   │   ├── add-address/    # Address management
│   │   ├── cart/           # Shopping cart
│   │   ├── my-orders/      # User order history
│   │   ├── product/        # Product details
│   │   ├── seller/         # Seller dashboard
│   │   └── user/           # User profile
├── assets/                 # Static assets and dummy data
├── components/             # Reusable React components
├── config/                 # Configuration (DB, Inngest)
├── context/                # React Context (Global State)
├── models/                 # Mongoose Data Models
├── public/                 # Public static files
└── utils/                  # Utility functions
```

## 🔌 API Endpoints

### User & Authentication
- `GET /api/user/data` - Fetch current user profile (auto-creates if missing)
- `GET /api/user/get-address` - Get saved addresses
- `POST /api/user/add-address` - Add a new address

### Products
- `GET /api/product/list` - List all products
- `POST /api/product/add` - Add a new product (Seller)
- `GET /api/product/seller-list` - List seller's products

### Cart
- `GET /api/cart/get` - Get user's cart
- `POST /api/cart/update` - Update cart items

### Orders
- `POST /api/order/create` - Create a new order
- `GET /api/order/list` - Get user's order history
- `GET /api/order/seller-orders` - Get all orders (Seller view)

### System
- `GET /api/seed` - Seed database with initial products

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd QuickCart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   INNGEST_EVENT_KEY=your_inngest_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Seed the database**
   Visit `http://localhost:3000/api/seed` to populate initial products.

## ✨ Features

- **User Authentication:** Secure login and signup via Clerk.
- **Product Browsing:** View popular and featured products.
- **Shopping Cart:** Add, remove, and update items in real-time.
- **Checkout Flow:** Select address and place orders.
- **Order History:** Track past orders and status.
- **Seller Dashboard:** Add products and view all orders.
- **Responsive Design:** Fully optimized for mobile and desktop.

## 📝 License

This project is licensed under the MIT License.
