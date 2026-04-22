const express = require('express');
const router = express.Router();
const { checkout, getUserOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/checkout', protect, checkout);
router.get('/user', protect, getUserOrders);

module.exports = router;
