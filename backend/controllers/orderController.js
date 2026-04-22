const db = require('../config/db');

// @desc    Checkout and create order using stored procedure
// @route   POST /api/orders/checkout
// @access  Private
const checkout = async (req, res) => {
    try {
        // Call stored procedure ProcessOrder(IN p_user_id INT, OUT p_order_id INT)
        await db.query('SET @order_id = 0');
        await db.query('CALL ProcessOrder(?, @order_id)', [req.user.id]);
        const [rows] = await db.query('SELECT @order_id AS order_id');
        
        const orderId = rows[0].order_id;
        
        if (orderId > 0) {
            res.status(201).json({ message: 'Order created successfully', orderId });
        } else {
            res.status(400).json({ message: 'Cart is empty or order could not be processed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/user
// @access  Private
const getUserOrders = async (req, res) => {
    try {
        const [orders] = await db.query(
            `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
            [req.user.id]
        );

        for (let order of orders) {
            const [items] = await db.query(
                `SELECT oi.*, p.name, p.image_url 
                 FROM order_items oi 
                 JOIN products p ON oi.product_id = p.id 
                 WHERE oi.order_id = ?`,
                [order.id]
            );
            order.items = items;
        }

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    checkout,
    getUserOrders
};
