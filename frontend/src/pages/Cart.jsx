import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 text-center">
                <h1 className="text-4xl font-heading font-bold mb-6">Your Cart</h1>
                <p className="text-gray-500 mb-8">Please login to view your cart.</p>
                <Link to="/login" className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-black/80 transition-colors">
                    Login
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 text-center">
                <h1 className="text-4xl font-heading font-bold mb-6">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/shop" className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-black/80 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-12">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {cart.map((item) => (
                        <motion.div 
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={item.id} 
                            className="flex flex-col sm:flex-row gap-6 bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
                        >
                            <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            
                            <div className="flex flex-col justify-between flex-grow py-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-heading font-bold hover:text-accent transition-colors">
                                            <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-1">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-lg">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                                </div>
                                
                                <div className="flex justify-between items-center mt-4 sm:mt-0">
                                    <div className="flex items-center gap-4 bg-gray-50 rounded-full px-2 py-1">
                                        <button 
                                            onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                                        >-</button>
                                        <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.product_id, Math.min(item.stock, item.quantity + 1))}
                                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                                        >+</button>
                                    </div>
                                    
                                    <button 
                                        onClick={() => removeFromCart(item.product_id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 sticky top-32">
                        <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>
                        
                        <div className="flex flex-col gap-4 text-gray-600 mb-8 border-b border-gray-200 pb-8">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-black font-medium">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-black font-medium text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-xl font-medium">Total</span>
                            <span className="text-3xl font-heading font-bold">${cartTotal.toFixed(2)}</span>
                        </div>
                        
                        <button 
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-black text-white py-5 rounded-full font-medium text-lg hover:bg-black/80 transition-colors flex justify-center items-center gap-2"
                        >
                            Proceed to Checkout <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
