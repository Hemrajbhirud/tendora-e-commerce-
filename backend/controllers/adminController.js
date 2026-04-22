const db = require('../config/db');

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const [orders] = await db.query(
            `SELECT o.*, u.name, u.email 
             FROM orders o 
             JOIN users u ON o.user_id = u.id 
             ORDER BY o.created_at DESC`
        );
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get store analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
    try {
        const [monthlySales] = await db.query('SELECT * FROM MonthlySales');
        const [topProducts] = await db.query('SELECT * FROM TopSellingProducts LIMIT 10');
        
        const [totalRevenueRow] = await db.query('SELECT SUM(total) as revenue FROM orders WHERE status != "cancelled"');
        const [totalOrdersRow] = await db.query('SELECT COUNT(*) as count FROM orders');
        const [totalUsersRow] = await db.query('SELECT COUNT(*) as count FROM users');

        res.json({
            monthlySales,
            topProducts,
            summary: {
                totalRevenue: totalRevenueRow[0].revenue || 0,
                totalOrders: totalOrdersRow[0].count,
                totalUsers: totalUsersRow[0].count
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOrders,
    getAnalytics
};
