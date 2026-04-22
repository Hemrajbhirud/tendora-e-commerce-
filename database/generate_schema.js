const fs = require('fs');

const categories = [
  'Fashion', 'Accessories', 'Tech', 'Lifestyle', 'Home', 'Fitness'
];

let sql = `
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
`;

const adjectives = ['Premium', 'Luxury', 'Essential', 'Minimalist', 'Smart', 'Classic', 'Modern', 'Sleek', 'Advanced', 'Ultra'];
const productTypes = {
  Fashion: ['Jacket', 'T-Shirt', 'Sneakers', 'Hoodie', 'Jeans', 'Sweater', 'Dress', 'Coat'],
  Accessories: ['Watch', 'Sunglasses', 'Wallet', 'Belt', 'Backpack', 'Necklace', 'Bracelet', 'Ring'],
  Tech: ['Headphones', 'Speaker', 'Mouse', 'Keyboard', 'Smartwatch', 'Tablet', 'Earbuds', 'Charger'],
  Lifestyle: ['Water Bottle', 'Notebook', 'Planner', 'Candle', 'Diffuser', 'Mug', 'Tote Bag', 'Journal'],
  Home: ['Lamp', 'Chair', 'Vase', 'Cushion', 'Blanket', 'Mirror', 'Rug', 'Clock'],
  Fitness: ['Yoga Mat', 'Dumbbells', 'Resistance Bands', 'Jump Rope', 'Foam Roller', 'Kettlebell', 'Water Jug', 'Gym Bag']
};

const images = {
  Fashion: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80'],
  Accessories: ['https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&q=80', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80'],
  Tech: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=600&q=80', 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600&q=80'],
  Lifestyle: ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80', 'https://images.unsplash.com/photo-1531347065363-d144d18fa7a7?w=600&q=80', 'https://images.unsplash.com/photo-1503602642458-1428daa9b4b0?w=600&q=80'],
  Home: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80', 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80', 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80'],
  Fitness: ['https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80', 'https://images.unsplash.com/photo-1584735935682-2f2b69d4fa8e?w=600&q=80', 'https://images.unsplash.com/photo-1526506114644-8390b1aa3095?w=600&q=80']
};

let values = [];
for (let i = 0; i < categories.length; i++) {
  let categoryName = categories[i];
  let catId = i + 1;
  let types = productTypes[categoryName];
  let catImages = images[categoryName];
  
  for (let j = 0; j < 25; j++) {
    let adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    let pType = types[Math.floor(Math.random() * types.length)];
    let name = `${adj} ${pType} Trendora`;
    let desc = `Discover the future of ${categoryName.toLowerCase()} with our ${name}. Designed for creators and trendsetters. Enjoy premium quality and minimal design.`;
    let price = (Math.random() * 200 + 20).toFixed(2);
    let stock = Math.floor(Math.random() * 100) + 10;
    let img = j < catImages.length ? catImages[j] : `https://picsum.photos/seed/${categoryName}${j}/600/600`;
    
    values.push(`(${catId}, '${name}', '${desc}', ${price}, ${stock}, '${img}')`);
  }
}

sql += values.join(',\n') + ';\n';

sql += `
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
`;

fs.writeFileSync('schema.sql', sql);
console.log('schema.sql generated successfully with 150 products!');
