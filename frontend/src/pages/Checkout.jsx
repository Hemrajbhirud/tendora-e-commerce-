import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const { data } = await api.post('/orders/checkout');
            clearCart();
            setOrderId(data.orderId);
            setSuccess(true);
        } catch (error) {
            alert('Checkout failed: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-32 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Order Confirmed!</h1>
                <p className="text-gray-500 text-lg mb-2">Thank you for shopping with Trendora.</p>
                <p className="text-gray-500 mb-10">Your order #{orderId} is being processed.</p>
                
                <div className="flex gap-4 justify-center">
                    <button onClick={() => navigate('/shop')} className="bg-gray-100 text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        Continue Shopping
                    </button>
                    <button onClick={() => navigate('/profile')} className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-black/80 transition-colors">
                        View Order status
                    </button>
                </div>
            </div>
        );
    }

    if (!user || cart.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-12">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-2xl font-bold mb-8">Shipping Information</h2>
                    <form className="flex flex-col gap-6" onSubmit={handleCheckout}>
                        <div className="grid grid-cols-2 gap-6">
                            <input type="text" placeholder="First Name" required className="bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-black" />
                            <input type="text" placeholder="Last Name" required className="bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-black" />
                        </div>
                        <input type="text" placeholder="Address" required className="bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-black" />
                        <div className="grid grid-cols-2 gap-6">
                            <input type="text" placeholder="City" required className="bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-black" />
                            <input type="text" placeholder="Postal Code" required className="bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-black" />
                        </div>
                        <input type="tel" placeholder="Phone" required className="bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-black" />
                        
                        <h2 className="text-2xl font-bold mt-8 mb-4">Payment Method</h2>
                        <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
                            <div className="flex items-center gap-4 mb-4">
                                <input type="radio" id="card" name="payment" defaultChecked className="w-5 h-5 text-black focus:ring-black" />
                                <label htmlFor="card" className="font-medium">Credit Card (Demo)</label>
                            </div>
                            <input type="text" placeholder="Card Number" className="w-full bg-white border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-black mb-4" />
                            <div className="grid grid-cols-2 gap-6">
                                <input type="text" placeholder="MM/YY" className="bg-white border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-black" />
                                <input type="text" placeholder="CVC" className="bg-white border border-gray-200 px-6 py-4 rounded-xl focus:outline-none focus:border-black" />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`mt-8 w-full py-5 rounded-full font-medium text-lg text-white transition-colors ${loading ? 'bg-gray-400' : 'bg-black hover:bg-black/80'}`}
                        >
                            {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                        </button>
                    </form>
                </div>
                
                <div>
                    <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 sticky top-32">
                        <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
                        <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                            {cart.map(item => (
                                <div key={item.product_id} className="flex gap-4">
                                    <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden shrink-0">
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="border-t border-gray-200 pt-6 flex flex-col gap-4 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-medium">Free</span>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-2xl">${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
