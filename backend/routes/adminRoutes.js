const express = require('express');
const router = express.Router();
const { getOrders, getAnalytics } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/orders', protect, admin, getOrders);
router.get('/analytics', protect, admin, getAnalytics);

module.exports = router;
