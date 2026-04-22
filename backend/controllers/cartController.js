const db = require('../config/db');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        const [cartItems] = await db.query(
            `SELECT c.id as cart_id, c.product_id, c.quantity, p.* 
             FROM cart c 
             JOIN products p ON c.product_id = p.id 
             WHERE c.user_id = ?`,
            [req.user.id]
        );
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const requestedQuantity = quantity || 1;

    try {
        // Check product stock
        const [products] = await db.query('SELECT stock FROM products WHERE id = ?', [product_id]);
        if (products.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const stock = products[0].stock;

        const [existing] = await db.query(
            'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
            [req.user.id, product_id]
        );

        const currentQuantityInCart = existing.length > 0 ? existing[0].quantity : 0;
        
        if (currentQuantityInCart + requestedQuantity > stock) {
            return res.status(400).json({ message: `Cannot add more than ${stock} items to the cart.` });
        }

        if (existing.length > 0) {
            // Update quantity
            await db.query(
                'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
                [requestedQuantity, req.user.id, product_id]
            );
        } else {
            // Insert new
            await db.query(
                'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [req.user.id, product_id, requestedQuantity]
            );
        }
        res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
const updateCartItem = async (req, res) => {
    const { product_id, quantity } = req.body;

    try {
        // Check product stock
        const [products] = await db.query('SELECT stock FROM products WHERE id = ?', [product_id]);
        if (products.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const stock = products[0].stock;

        if (quantity > stock) {
             return res.status(400).json({ message: `Cannot add more than ${stock} items to the cart.` });
        }

        await db.query(
            'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
            [quantity, req.user.id, product_id]
        );
        res.json({ message: 'Cart updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove
// @access  Private
const removeFromCart = async (req, res) => {
    const { product_id } = req.body; // or could be req.query, but let's stick to req.body for this or expect it in URL if we had a param. The spec says DELETE /api/cart/remove
    
    // Instead of using req.body in DELETE, which is valid but less common, 
    // we can use a param if the user sends DELETE /api/cart/remove/:product_id
    // But since spec is exact: DELETE /api/cart/remove, we will use req.body
    
    try {
        // Fallback: check query if body is empty
        const idToRemove = req.body.product_id || req.query.product_id;
        
        await db.query(
            'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
            [req.user.id, idToRemove]
        );
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
};
