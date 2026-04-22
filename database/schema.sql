
-- Trendora Database Schema

CREATE DATABASE IF NOT EXISTS trendora_db;
USE trendora_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Cart Table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY user_product (user_id, product_id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert Categories
INSERT INTO categories (name, slug, image_url) VALUES
('Fashion', 'fashion', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80'),
('Accessories', 'accessories', 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80'),
('Tech', 'tech', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80'),
('Lifestyle', 'lifestyle', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'),
('Home', 'home', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'),
('Fitness', 'fitness', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Insert Sample Products
INSERT INTO products (category_id, name, description, price, stock, image_url) VALUES
(1, 'Ultra Sweater Trendora', 'Discover the future of fashion with our Ultra Sweater Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 56.66, 84, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80'),
(1, 'Ultra Dress Trendora', 'Discover the future of fashion with our Ultra Dress Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 64.34, 85, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80'),
(1, 'Modern Jeans Trendora', 'Discover the future of fashion with our Modern Jeans Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 213.47, 72, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80'),
(1, 'Smart Coat Trendora', 'Discover the future of fashion with our Smart Coat Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 65.33, 89, 'https://picsum.photos/seed/Fashion3/600/600'),
(1, 'Sleek Jacket Trendora', 'Discover the future of fashion with our Sleek Jacket Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 45.57, 30, 'https://picsum.photos/seed/Fashion4/600/600'),
(1, 'Classic Hoodie Trendora', 'Discover the future of fashion with our Classic Hoodie Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 94.43, 67, 'https://picsum.photos/seed/Fashion5/600/600'),
(1, 'Minimalist Hoodie Trendora', 'Discover the future of fashion with our Minimalist Hoodie Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 207.23, 66, 'https://picsum.photos/seed/Fashion6/600/600'),
(1, 'Classic T-Shirt Trendora', 'Discover the future of fashion with our Classic T-Shirt Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 26.65, 22, 'https://picsum.photos/seed/Fashion7/600/600'),
(1, 'Advanced Coat Trendora', 'Discover the future of fashion with our Advanced Coat Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 69.94, 103, 'https://picsum.photos/seed/Fashion8/600/600'),
(1, 'Luxury Sneakers Trendora', 'Discover the future of fashion with our Luxury Sneakers Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 195.59, 30, 'https://picsum.photos/seed/Fashion9/600/600'),
(1, 'Ultra Hoodie Trendora', 'Discover the future of fashion with our Ultra Hoodie Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 176.30, 89, 'https://picsum.photos/seed/Fashion10/600/600'),
(1, 'Luxury Coat Trendora', 'Discover the future of fashion with our Luxury Coat Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 179.38, 35, 'https://picsum.photos/seed/Fashion11/600/600'),
(1, 'Sleek Coat Trendora', 'Discover the future of fashion with our Sleek Coat Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 174.75, 66, 'https://picsum.photos/seed/Fashion12/600/600'),
(1, 'Minimalist Jeans Trendora', 'Discover the future of fashion with our Minimalist Jeans Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 165.17, 20, 'https://picsum.photos/seed/Fashion13/600/600'),
(1, 'Modern Hoodie Trendora', 'Discover the future of fashion with our Modern Hoodie Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 88.40, 77, 'https://picsum.photos/seed/Fashion14/600/600'),
(1, 'Luxury Sweater Trendora', 'Discover the future of fashion with our Luxury Sweater Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 22.84, 65, 'https://picsum.photos/seed/Fashion15/600/600'),
(1, 'Modern Coat Trendora', 'Discover the future of fashion with our Modern Coat Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 23.25, 22, 'https://picsum.photos/seed/Fashion16/600/600'),
(1, 'Premium Coat Trendora', 'Discover the future of fashion with our Premium Coat Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 63.64, 59, 'https://picsum.photos/seed/Fashion17/600/600'),
(1, 'Advanced T-Shirt Trendora', 'Discover the future of fashion with our Advanced T-Shirt Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 40.63, 33, 'https://picsum.photos/seed/Fashion18/600/600'),
(1, 'Modern Sneakers Trendora', 'Discover the future of fashion with our Modern Sneakers Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 189.93, 86, 'https://picsum.photos/seed/Fashion19/600/600'),
(1, 'Sleek Sneakers Trendora', 'Discover the future of fashion with our Sleek Sneakers Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 72.27, 57, 'https://picsum.photos/seed/Fashion20/600/600'),
(1, 'Minimalist T-Shirt Trendora', 'Discover the future of fashion with our Minimalist T-Shirt Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 158.38, 14, 'https://picsum.photos/seed/Fashion21/600/600'),
(1, 'Ultra Dress Trendora', 'Discover the future of fashion with our Ultra Dress Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 160.23, 13, 'https://picsum.photos/seed/Fashion22/600/600'),
(1, 'Luxury Jeans Trendora', 'Discover the future of fashion with our Luxury Jeans Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 130.52, 10, 'https://picsum.photos/seed/Fashion23/600/600'),
(1, 'Advanced Coat Trendora', 'Discover the future of fashion with our Advanced Coat Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 73.61, 24, 'https://picsum.photos/seed/Fashion24/600/600'),
(2, 'Sleek Ring Trendora', 'Discover the future of accessories with our Sleek Ring Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 98.34, 37, 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&q=80'),
(2, 'Advanced Bracelet Trendora', 'Discover the future of accessories with our Advanced Bracelet Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 155.24, 57, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80'),
(2, 'Essential Ring Trendora', 'Discover the future of accessories with our Essential Ring Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 87.78, 62, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80'),
(2, 'Classic Backpack Trendora', 'Discover the future of accessories with our Classic Backpack Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 39.29, 88, 'https://picsum.photos/seed/Accessories3/600/600'),
(2, 'Luxury Backpack Trendora', 'Discover the future of accessories with our Luxury Backpack Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 141.25, 11, 'https://picsum.photos/seed/Accessories4/600/600'),
(2, 'Ultra Backpack Trendora', 'Discover the future of accessories with our Ultra Backpack Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 101.18, 54, 'https://picsum.photos/seed/Accessories5/600/600'),
(2, 'Premium Sunglasses Trendora', 'Discover the future of accessories with our Premium Sunglasses Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 65.53, 15, 'https://picsum.photos/seed/Accessories6/600/600'),
(2, 'Ultra Necklace Trendora', 'Discover the future of accessories with our Ultra Necklace Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 120.11, 19, 'https://picsum.photos/seed/Accessories7/600/600'),
(2, 'Modern Necklace Trendora', 'Discover the future of accessories with our Modern Necklace Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 88.87, 70, 'https://picsum.photos/seed/Accessories8/600/600'),
(2, 'Modern Sunglasses Trendora', 'Discover the future of accessories with our Modern Sunglasses Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 37.16, 18, 'https://picsum.photos/seed/Accessories9/600/600'),
(2, 'Premium Backpack Trendora', 'Discover the future of accessories with our Premium Backpack Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 131.42, 21, 'https://picsum.photos/seed/Accessories10/600/600'),
(2, 'Premium Backpack Trendora', 'Discover the future of accessories with our Premium Backpack Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 179.34, 48, 'https://picsum.photos/seed/Accessories11/600/600'),
(2, 'Smart Belt Trendora', 'Discover the future of accessories with our Smart Belt Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 211.83, 12, 'https://picsum.photos/seed/Accessories12/600/600'),
(2, 'Classic Backpack Trendora', 'Discover the future of accessories with our Classic Backpack Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 144.23, 18, 'https://picsum.photos/seed/Accessories13/600/600'),
(2, 'Advanced Ring Trendora', 'Discover the future of accessories with our Advanced Ring Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 190.59, 76, 'https://picsum.photos/seed/Accessories14/600/600'),
(2, 'Luxury Wallet Trendora', 'Discover the future of accessories with our Luxury Wallet Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 195.79, 102, 'https://picsum.photos/seed/Accessories15/600/600'),
(2, 'Minimalist Bracelet Trendora', 'Discover the future of accessories with our Minimalist Bracelet Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 184.75, 109, 'https://picsum.photos/seed/Accessories16/600/600'),
(2, 'Minimalist Wallet Trendora', 'Discover the future of accessories with our Minimalist Wallet Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 105.41, 13, 'https://picsum.photos/seed/Accessories17/600/600'),
(2, 'Modern Necklace Trendora', 'Discover the future of accessories with our Modern Necklace Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 49.75, 37, 'https://picsum.photos/seed/Accessories18/600/600'),
(2, 'Modern Belt Trendora', 'Discover the future of accessories with our Modern Belt Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 90.21, 28, 'https://picsum.photos/seed/Accessories19/600/600'),
(2, 'Minimalist Watch Trendora', 'Discover the future of accessories with our Minimalist Watch Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 43.68, 14, 'https://picsum.photos/seed/Accessories20/600/600'),
(2, 'Premium Belt Trendora', 'Discover the future of accessories with our Premium Belt Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 123.51, 12, 'https://picsum.photos/seed/Accessories21/600/600'),
(2, 'Premium Necklace Trendora', 'Discover the future of accessories with our Premium Necklace Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 215.78, 24, 'https://picsum.photos/seed/Accessories22/600/600'),
(2, 'Essential Watch Trendora', 'Discover the future of accessories with our Essential Watch Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 178.95, 108, 'https://picsum.photos/seed/Accessories23/600/600'),
(2, 'Smart Backpack Trendora', 'Discover the future of accessories with our Smart Backpack Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 86.29, 99, 'https://picsum.photos/seed/Accessories24/600/600'),
(3, 'Essential Headphones Trendora', 'Discover the future of tech with our Essential Headphones Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 83.21, 46, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'),
(3, 'Classic Smartwatch Trendora', 'Discover the future of tech with our Classic Smartwatch Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 84.10, 90, 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=600&q=80'),
(3, 'Classic Earbuds Trendora', 'Discover the future of tech with our Classic Earbuds Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 127.08, 40, 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600&q=80'),
(3, 'Classic Earbuds Trendora', 'Discover the future of tech with our Classic Earbuds Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 133.62, 35, 'https://picsum.photos/seed/Tech3/600/600'),
(3, 'Modern Keyboard Trendora', 'Discover the future of tech with our Modern Keyboard Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 100.56, 52, 'https://picsum.photos/seed/Tech4/600/600'),
(3, 'Sleek Tablet Trendora', 'Discover the future of tech with our Sleek Tablet Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 133.24, 99, 'https://picsum.photos/seed/Tech5/600/600'),
(3, 'Classic Speaker Trendora', 'Discover the future of tech with our Classic Speaker Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 152.54, 12, 'https://picsum.photos/seed/Tech6/600/600'),
(3, 'Ultra Speaker Trendora', 'Discover the future of tech with our Ultra Speaker Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 22.28, 31, 'https://picsum.photos/seed/Tech7/600/600'),
(3, 'Smart Speaker Trendora', 'Discover the future of tech with our Smart Speaker Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 135.93, 40, 'https://picsum.photos/seed/Tech8/600/600'),
(3, 'Sleek Headphones Trendora', 'Discover the future of tech with our Sleek Headphones Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 129.16, 51, 'https://picsum.photos/seed/Tech9/600/600'),
(3, 'Sleek Mouse Trendora', 'Discover the future of tech with our Sleek Mouse Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 135.59, 90, 'https://picsum.photos/seed/Tech10/600/600'),
(3, 'Essential Tablet Trendora', 'Discover the future of tech with our Essential Tablet Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 146.34, 41, 'https://picsum.photos/seed/Tech11/600/600'),
(3, 'Premium Earbuds Trendora', 'Discover the future of tech with our Premium Earbuds Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 141.42, 91, 'https://picsum.photos/seed/Tech12/600/600'),
(3, 'Ultra Speaker Trendora', 'Discover the future of tech with our Ultra Speaker Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 118.58, 29, 'https://picsum.photos/seed/Tech13/600/600'),
(3, 'Minimalist Charger Trendora', 'Discover the future of tech with our Minimalist Charger Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 107.38, 24, 'https://picsum.photos/seed/Tech14/600/600'),
(3, 'Luxury Tablet Trendora', 'Discover the future of tech with our Luxury Tablet Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 39.09, 27, 'https://picsum.photos/seed/Tech15/600/600'),
(3, 'Ultra Smartwatch Trendora', 'Discover the future of tech with our Ultra Smartwatch Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 63.73, 57, 'https://picsum.photos/seed/Tech16/600/600'),
(3, 'Essential Keyboard Trendora', 'Discover the future of tech with our Essential Keyboard Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 43.84, 99, 'https://picsum.photos/seed/Tech17/600/600'),
(3, 'Essential Smartwatch Trendora', 'Discover the future of tech with our Essential Smartwatch Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 162.85, 67, 'https://picsum.photos/seed/Tech18/600/600'),
(3, 'Minimalist Earbuds Trendora', 'Discover the future of tech with our Minimalist Earbuds Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 169.24, 92, 'https://picsum.photos/seed/Tech19/600/600'),
(3, 'Sleek Headphones Trendora', 'Discover the future of tech with our Sleek Headphones Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 101.81, 19, 'https://picsum.photos/seed/Tech20/600/600'),
(3, 'Premium Speaker Trendora', 'Discover the future of tech with our Premium Speaker Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 93.12, 72, 'https://picsum.photos/seed/Tech21/600/600'),
(3, 'Premium Headphones Trendora', 'Discover the future of tech with our Premium Headphones Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 191.99, 18, 'https://picsum.photos/seed/Tech22/600/600'),
(3, 'Luxury Keyboard Trendora', 'Discover the future of tech with our Luxury Keyboard Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 198.00, 95, 'https://picsum.photos/seed/Tech23/600/600'),
(3, 'Classic Smartwatch Trendora', 'Discover the future of tech with our Classic Smartwatch Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 130.95, 14, 'https://picsum.photos/seed/Tech24/600/600'),
(4, 'Ultra Notebook Trendora', 'Discover the future of lifestyle with our Ultra Notebook Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 25.78, 56, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80'),
(4, 'Advanced Tote Bag Trendora', 'Discover the future of lifestyle with our Advanced Tote Bag Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 87.38, 54, 'https://images.unsplash.com/photo-1531347065363-d144d18fa7a7?w=600&q=80'),
(4, 'Sleek Planner Trendora', 'Discover the future of lifestyle with our Sleek Planner Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 181.62, 29, 'https://images.unsplash.com/photo-1503602642458-1428daa9b4b0?w=600&q=80'),
(4, 'Essential Candle Trendora', 'Discover the future of lifestyle with our Essential Candle Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 91.84, 59, 'https://picsum.photos/seed/Lifestyle3/600/600'),
(4, 'Smart Candle Trendora', 'Discover the future of lifestyle with our Smart Candle Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 219.29, 64, 'https://picsum.photos/seed/Lifestyle4/600/600'),
(4, 'Sleek Notebook Trendora', 'Discover the future of lifestyle with our Sleek Notebook Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 98.48, 59, 'https://picsum.photos/seed/Lifestyle5/600/600'),
(4, 'Advanced Journal Trendora', 'Discover the future of lifestyle with our Advanced Journal Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 165.49, 16, 'https://picsum.photos/seed/Lifestyle6/600/600'),
(4, 'Modern Water Bottle Trendora', 'Discover the future of lifestyle with our Modern Water Bottle Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 207.80, 75, 'https://picsum.photos/seed/Lifestyle7/600/600'),
(4, 'Smart Water Bottle Trendora', 'Discover the future of lifestyle with our Smart Water Bottle Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 111.64, 55, 'https://picsum.photos/seed/Lifestyle8/600/600'),
(4, 'Luxury Notebook Trendora', 'Discover the future of lifestyle with our Luxury Notebook Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 106.33, 13, 'https://picsum.photos/seed/Lifestyle9/600/600'),
(4, 'Sleek Journal Trendora', 'Discover the future of lifestyle with our Sleek Journal Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 25.47, 52, 'https://picsum.photos/seed/Lifestyle10/600/600'),
(4, 'Ultra Notebook Trendora', 'Discover the future of lifestyle with our Ultra Notebook Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 22.70, 52, 'https://picsum.photos/seed/Lifestyle11/600/600'),
(4, 'Luxury Diffuser Trendora', 'Discover the future of lifestyle with our Luxury Diffuser Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 23.46, 106, 'https://picsum.photos/seed/Lifestyle12/600/600'),
(4, 'Smart Notebook Trendora', 'Discover the future of lifestyle with our Smart Notebook Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 190.07, 14, 'https://picsum.photos/seed/Lifestyle13/600/600'),
(4, 'Premium Diffuser Trendora', 'Discover the future of lifestyle with our Premium Diffuser Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 97.15, 79, 'https://picsum.photos/seed/Lifestyle14/600/600'),
(4, 'Luxury Notebook Trendora', 'Discover the future of lifestyle with our Luxury Notebook Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 81.65, 109, 'https://picsum.photos/seed/Lifestyle15/600/600'),
(4, 'Premium Notebook Trendora', 'Discover the future of lifestyle with our Premium Notebook Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 87.71, 49, 'https://picsum.photos/seed/Lifestyle16/600/600'),
(4, 'Classic Planner Trendora', 'Discover the future of lifestyle with our Classic Planner Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 23.73, 29, 'https://picsum.photos/seed/Lifestyle17/600/600'),
(4, 'Minimalist Tote Bag Trendora', 'Discover the future of lifestyle with our Minimalist Tote Bag Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 66.80, 50, 'https://picsum.photos/seed/Lifestyle18/600/600'),
(4, 'Premium Mug Trendora', 'Discover the future of lifestyle with our Premium Mug Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 145.57, 88, 'https://picsum.photos/seed/Lifestyle19/600/600'),
(4, 'Classic Tote Bag Trendora', 'Discover the future of lifestyle with our Classic Tote Bag Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 49.07, 84, 'https://picsum.photos/seed/Lifestyle20/600/600'),
(4, 'Smart Water Bottle Trendora', 'Discover the future of lifestyle with our Smart Water Bottle Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 71.48, 57, 'https://picsum.photos/seed/Lifestyle21/600/600'),
(4, 'Premium Tote Bag Trendora', 'Discover the future of lifestyle with our Premium Tote Bag Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 35.51, 22, 'https://picsum.photos/seed/Lifestyle22/600/600'),
(4, 'Ultra Candle Trendora', 'Discover the future of lifestyle with our Ultra Candle Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 204.72, 17, 'https://picsum.photos/seed/Lifestyle23/600/600'),
(4, 'Modern Tote Bag Trendora', 'Discover the future of lifestyle with our Modern Tote Bag Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 66.56, 52, 'https://picsum.photos/seed/Lifestyle24/600/600'),
(5, 'Essential Clock Trendora', 'Discover the future of home with our Essential Clock Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 202.94, 101, 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80'),
(5, 'Essential Clock Trendora', 'Discover the future of home with our Essential Clock Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 71.45, 28, 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80'),
(5, 'Minimalist Clock Trendora', 'Discover the future of home with our Minimalist Clock Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 94.48, 47, 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80'),
(5, 'Sleek Mirror Trendora', 'Discover the future of home with our Sleek Mirror Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 216.71, 100, 'https://picsum.photos/seed/Home3/600/600'),
(5, 'Advanced Cushion Trendora', 'Discover the future of home with our Advanced Cushion Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 68.07, 46, 'https://picsum.photos/seed/Home4/600/600'),
(5, 'Smart Blanket Trendora', 'Discover the future of home with our Smart Blanket Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 193.95, 63, 'https://picsum.photos/seed/Home5/600/600'),
(5, 'Ultra Mirror Trendora', 'Discover the future of home with our Ultra Mirror Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 153.71, 73, 'https://picsum.photos/seed/Home6/600/600'),
(5, 'Ultra Clock Trendora', 'Discover the future of home with our Ultra Clock Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 117.04, 79, 'https://picsum.photos/seed/Home7/600/600'),
(5, 'Modern Rug Trendora', 'Discover the future of home with our Modern Rug Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 71.22, 83, 'https://picsum.photos/seed/Home8/600/600'),
(5, 'Modern Blanket Trendora', 'Discover the future of home with our Modern Blanket Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 127.16, 18, 'https://picsum.photos/seed/Home9/600/600'),
(5, 'Essential Lamp Trendora', 'Discover the future of home with our Essential Lamp Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 72.92, 72, 'https://picsum.photos/seed/Home10/600/600'),
(5, 'Modern Lamp Trendora', 'Discover the future of home with our Modern Lamp Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 53.10, 93, 'https://picsum.photos/seed/Home11/600/600'),
(5, 'Sleek Cushion Trendora', 'Discover the future of home with our Sleek Cushion Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 78.83, 97, 'https://picsum.photos/seed/Home12/600/600'),
(5, 'Advanced Mirror Trendora', 'Discover the future of home with our Advanced Mirror Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 212.16, 29, 'https://picsum.photos/seed/Home13/600/600'),
(5, 'Modern Rug Trendora', 'Discover the future of home with our Modern Rug Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 215.65, 84, 'https://picsum.photos/seed/Home14/600/600'),
(5, 'Minimalist Clock Trendora', 'Discover the future of home with our Minimalist Clock Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 79.07, 86, 'https://picsum.photos/seed/Home15/600/600'),
(5, 'Sleek Clock Trendora', 'Discover the future of home with our Sleek Clock Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 83.25, 44, 'https://picsum.photos/seed/Home16/600/600'),
(5, 'Essential Blanket Trendora', 'Discover the future of home with our Essential Blanket Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 65.78, 61, 'https://picsum.photos/seed/Home17/600/600'),
(5, 'Ultra Mirror Trendora', 'Discover the future of home with our Ultra Mirror Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 131.92, 94, 'https://picsum.photos/seed/Home18/600/600'),
(5, 'Smart Cushion Trendora', 'Discover the future of home with our Smart Cushion Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 108.29, 101, 'https://picsum.photos/seed/Home19/600/600'),
(5, 'Premium Clock Trendora', 'Discover the future of home with our Premium Clock Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 170.99, 37, 'https://picsum.photos/seed/Home20/600/600'),
(5, 'Ultra Vase Trendora', 'Discover the future of home with our Ultra Vase Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 53.03, 104, 'https://picsum.photos/seed/Home21/600/600'),
(5, 'Luxury Chair Trendora', 'Discover the future of home with our Luxury Chair Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 166.54, 70, 'https://picsum.photos/seed/Home22/600/600'),
(5, 'Premium Lamp Trendora', 'Discover the future of home with our Premium Lamp Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 129.82, 51, 'https://picsum.photos/seed/Home23/600/600'),
(5, 'Advanced Clock Trendora', 'Discover the future of home with our Advanced Clock Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 182.35, 11, 'https://picsum.photos/seed/Home24/600/600'),
(6, 'Essential Foam Roller Trendora', 'Discover the future of fitness with our Essential Foam Roller Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 35.84, 107, 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80'),
(6, 'Advanced Jump Rope Trendora', 'Discover the future of fitness with our Advanced Jump Rope Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 130.49, 23, 'https://images.unsplash.com/photo-1584735935682-2f2b69d4fa8e?w=600&q=80'),
(6, 'Modern Dumbbells Trendora', 'Discover the future of fitness with our Modern Dumbbells Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 137.91, 15, 'https://images.unsplash.com/photo-1526506114644-8390b1aa3095?w=600&q=80'),
(6, 'Smart Jump Rope Trendora', 'Discover the future of fitness with our Smart Jump Rope Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 72.38, 68, 'https://picsum.photos/seed/Fitness3/600/600'),
(6, 'Ultra Jump Rope Trendora', 'Discover the future of fitness with our Ultra Jump Rope Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 200.78, 14, 'https://picsum.photos/seed/Fitness4/600/600'),
(6, 'Premium Gym Bag Trendora', 'Discover the future of fitness with our Premium Gym Bag Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 118.65, 38, 'https://picsum.photos/seed/Fitness5/600/600'),
(6, 'Premium Resistance Bands Trendora', 'Discover the future of fitness with our Premium Resistance Bands Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 149.67, 67, 'https://picsum.photos/seed/Fitness6/600/600'),
(6, 'Advanced Gym Bag Trendora', 'Discover the future of fitness with our Advanced Gym Bag Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 208.13, 20, 'https://picsum.photos/seed/Fitness7/600/600'),
(6, 'Luxury Jump Rope Trendora', 'Discover the future of fitness with our Luxury Jump Rope Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 138.62, 107, 'https://picsum.photos/seed/Fitness8/600/600'),
(6, 'Smart Water Jug Trendora', 'Discover the future of fitness with our Smart Water Jug Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 85.46, 39, 'https://picsum.photos/seed/Fitness9/600/600'),
(6, 'Sleek Jump Rope Trendora', 'Discover the future of fitness with our Sleek Jump Rope Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 70.90, 29, 'https://picsum.photos/seed/Fitness10/600/600'),
(6, 'Luxury Jump Rope Trendora', 'Discover the future of fitness with our Luxury Jump Rope Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 158.21, 22, 'https://picsum.photos/seed/Fitness11/600/600'),
(6, 'Smart Foam Roller Trendora', 'Discover the future of fitness with our Smart Foam Roller Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 68.42, 52, 'https://picsum.photos/seed/Fitness12/600/600'),
(6, 'Sleek Water Jug Trendora', 'Discover the future of fitness with our Sleek Water Jug Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 140.45, 43, 'https://picsum.photos/seed/Fitness13/600/600'),
(6, 'Luxury Foam Roller Trendora', 'Discover the future of fitness with our Luxury Foam Roller Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 120.85, 76, 'https://picsum.photos/seed/Fitness14/600/600'),
(6, 'Classic Yoga Mat Trendora', 'Discover the future of fitness with our Classic Yoga Mat Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 44.00, 26, 'https://picsum.photos/seed/Fitness15/600/600'),
(6, 'Advanced Gym Bag Trendora', 'Discover the future of fitness with our Advanced Gym Bag Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 48.81, 55, 'https://picsum.photos/seed/Fitness16/600/600'),
(6, 'Ultra Gym Bag Trendora', 'Discover the future of fitness with our Ultra Gym Bag Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 107.51, 18, 'https://picsum.photos/seed/Fitness17/600/600'),
(6, 'Modern Gym Bag Trendora', 'Discover the future of fitness with our Modern Gym Bag Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 162.47, 79, 'https://picsum.photos/seed/Fitness18/600/600'),
(6, 'Modern Water Jug Trendora', 'Discover the future of fitness with our Modern Water Jug Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 178.33, 81, 'https://picsum.photos/seed/Fitness19/600/600'),
(6, 'Sleek Jump Rope Trendora', 'Discover the future of fitness with our Sleek Jump Rope Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 68.71, 18, 'https://picsum.photos/seed/Fitness20/600/600'),
(6, 'Classic Dumbbells Trendora', 'Discover the future of fitness with our Classic Dumbbells Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 83.16, 45, 'https://picsum.photos/seed/Fitness21/600/600'),
(6, 'Essential Kettlebell Trendora', 'Discover the future of fitness with our Essential Kettlebell Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 29.64, 65, 'https://picsum.photos/seed/Fitness22/600/600'),
(6, 'Essential Water Jug Trendora', 'Discover the future of fitness with our Essential Water Jug Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 153.96, 12, 'https://picsum.photos/seed/Fitness23/600/600'),
(6, 'Advanced Kettlebell Trendora', 'Discover the future of fitness with our Advanced Kettlebell Trendora. Designed for creators and trendsetters. Enjoy premium quality and minimal design.', 35.35, 87, 'https://picsum.photos/seed/Fitness24/600/600');

-- Advanced SQL: Views
CREATE OR REPLACE VIEW TopSellingProducts AS
SELECT p.id, p.name, p.price, p.image_url, SUM(oi.quantity) as total_sold
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status != 'cancelled'
GROUP BY p.id
ORDER BY total_sold DESC;

CREATE OR REPLACE VIEW MonthlySales AS
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') as month,
    SUM(total) as revenue,
    COUNT(id) as total_orders
FROM orders
WHERE status != 'cancelled'
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;

-- Stored Procedure: ProcessOrder
DELIMITER //

CREATE PROCEDURE ProcessOrder(IN p_user_id INT, OUT p_order_id INT)
BEGIN
    DECLARE v_total DECIMAL(10, 2);
    DECLARE v_cart_count INT;
    
    -- Check if cart has items
    SELECT COUNT(*) INTO v_cart_count FROM cart WHERE user_id = p_user_id;
    
    IF v_cart_count > 0 THEN
        -- Calculate total
        SELECT IFNULL(SUM(p.price * c.quantity), 0) INTO v_total
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = p_user_id;
        
        -- Create order
        INSERT INTO orders (user_id, total, status) VALUES (p_user_id, v_total, 'processing');
        SET p_order_id = LAST_INSERT_ID();
        
        -- Insert order items
        INSERT INTO order_items (order_id, product_id, quantity, price)
        SELECT p_order_id, c.product_id, c.quantity, p.price
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = p_user_id;
        
        -- Update stock
        UPDATE products p
        JOIN cart c ON p.id = c.product_id
        SET p.stock = p.stock - c.quantity
        WHERE c.user_id = p_user_id;
        
        -- Clear cart
        DELETE FROM cart WHERE user_id = p_user_id;
    ELSE
        SET p_order_id = 0;
    END IF;
    
END //

DELIMITER ;
