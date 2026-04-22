# Trendora - Modern Ecommerce Platform

Welcome to Trendora, the future of shopping. This is a production-quality full-stack ecommerce application featuring a premium, animated UI inspired by modern brand websites. 

## Features
- **Frontend**: React + Vite, Tailwind CSS v4, Framer Motion, Lenis Smooth Scrolling.
- **Backend**: Node.js + Express, MySQL, JWT Authentication.
- **Database**: 150 Sample Products with auto-generated data, stored procedures for orders.
- **UI Components**: Glassmorphism navbar, scroll-triggered animations, premium typography and spacing.

## Prerequisites
- Node.js (v18+)
- MySQL Server

## Getting Started

### 1. Database Setup
1. Open your MySQL client or terminal.
2. Run the provided schema script to create the DB, tables, views, stored procedures, and 150 products:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
*(Note: If you are using a different DB user/password, update it in the `.env` file in the backend folder.)*

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
*The backend will run on `http://localhost:5000`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
*The frontend will run on `http://localhost:5173`.*

### 4. Admin Access
To access the Admin Dashboard, register a new account on the frontend. Then, connect to your MySQL database and update your user role to `admin`:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```
Log out and log back in to see the 'Admin Dashboard' button in your profile.

## Directory Structure
- `/database` - Contains `schema.sql` with all DB logic and sample data.
- `/backend` - Express REST API with JWT Auth and MySQL connection pool.
- `/frontend` - React Vite App with Tailwind, Framer Motion, and Context API.

## Screenshots

Place your frontend module screenshots in a `screenshots` directory at the project root with the corresponding filenames below.

### Home Page
![Home Page](screenshots/home.png)

### Shop / Products
![Shop Page](screenshots/shop.png)

### Product Listing
![Product Details](screenshots/product.png)

### Cart & Checkout
![Cart Page](screenshots/cart.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin.png)
