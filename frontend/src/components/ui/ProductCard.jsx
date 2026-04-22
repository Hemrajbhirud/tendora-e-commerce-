import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { cart, addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const isInCart = cart && cart.some(item => item.product_id === product.id);

    const handleButtonClick = () => {
        if (isInCart) {
            navigate('/cart');
        } else {
            addToCart(product.id, 1);
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="group flex flex-col gap-4 relative"
        >
            <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] relative">
                <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                />
            </Link>
            
            <div className="flex flex-col gap-1 px-2">
                <div className="flex justify-between items-start">
                    <Link to={`/product/${product.id}`} className="font-heading font-medium text-lg hover:text-accent transition-colors">
                        {product.name}
                    </Link>
                    <span className="font-semibold text-lg">${(Number(product.price)).toFixed(2)}</span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-1">{product.description}</p>
            </div>
            
            <div className="px-2 mt-2">
                <motion.button 
                    onClick={handleButtonClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl border border-black font-medium transition-colors ${
                        isInCart ? 'bg-accent border-accent text-white hover:bg-black hover:border-black' 
                                 : 'text-black hover:bg-black hover:text-white'
                    }`}
                >
                    {isInCart ? 'Go to Cart' : 'Add to Cart'}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
