import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) return alert('Please login to add to cart');
        const res = await addToCart(product.id, quantity);
        if (res && res.success) {
            alert('Added to cart!');
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div></div>;
    if (!product) return <div className="h-screen flex items-center justify-center">Product not found.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-[2.5rem] overflow-hidden bg-gray-50 aspect-square"
                >
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col justify-center"
                >
                    <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-4">Trendora Exclusive</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl font-light mb-8">${(Number(product.price)).toFixed(2)}</p>
                    
                    <div className="h-[1px] w-full bg-border mb-8"></div>
                    
                    <p className="text-gray-600 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="mb-10">
                        <span className="text-sm text-gray-400 block mb-2">Availability: {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
                        <div className="flex items-center gap-4">
                            <div className="flex bg-gray-100 rounded-full overflow-hidden">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-5 py-3 hover:bg-gray-200 transition-colors">-</button>
                                <div className="px-2 py-3 w-12 text-center font-medium">{quantity}</div>
                                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-5 py-3 hover:bg-gray-200 transition-colors">+</button>
                            </div>
                        </div>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className={`w-full py-5 rounded-full font-medium text-lg transition-colors ${
                            product.stock === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-black/80'
                        }`}
                    >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
