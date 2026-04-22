const db = require('../config/db');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        
        if (products.length > 0) {
            res.json(products[0]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const { category_id, name, description, price, stock, image_url } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO products (category_id, name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [category_id, name, description, price, stock, image_url]
        );
        res.status(201).json({ id: result.insertId, category_id, name, description, price, stock, image_url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const { category_id, name, description, price, stock, image_url } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE products SET category_id = ?, name = ?, description = ?, price = ?, stock = ?, image_url = ? WHERE id = ?',
            [category_id, name, description, price, stock, image_url, req.params.id]
        );
        
        if (result.affectedRows > 0) {
            res.json({ id: req.params.id, category_id, name, description, price, stock, image_url });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows > 0) {
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
