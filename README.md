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
<img width="1572" height="848" alt="Screenshot 2026-04-22 at 11 44 00 AM" src="https://github.com/user-attachments/assets/add1d9a5-9a75-4567-8c7e-0aad5cfbb155" />


### Shop / Products
<img width="1710" height="985" alt="Screenshot 2026-04-22 at 11 44 43 AM" src="https://github.com/user-attachments/assets/3b7392fe-3a58-4d85-9438-2d8663c0773a" />


### Product Listing
<img width="1707" height="983" alt="Screenshot 2026-04-22 at 11 44 25 AM" src="https://github.com/user-attachments/assets/0d78b64b-db68-48d9-886d-e794328addfc" />


### Cart & Checkout
<img width="1697" height="970" alt="Screenshot 2026-04-22 at 11 45 25 AM" src="https://github.com/user-attachments/assets/ef2a63e2-f1a7-4a6a-bc11-e3cb7de64780" />
<img width="1572" height="810" alt="Screenshot 2026-04-26 at 11 29 57 PM" src="https://github.com/user-attachments/assets/fd269268-353e-4c83-8c66-6759af292866" />

