import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart([]);
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const { data } = await api.get('/cart');
            setCart(data);
        } catch (error) {
            console.error('Failed to fetch cart', error);
        }
    };

    const addToCart = async (product_id, quantity = 1) => {
        if (!user) return alert('Please login to add to cart');
        
        try {
            await api.post('/cart/add', { product_id, quantity });
            fetchCart();
            return { success: true };
        } catch (error) {
            console.error('Failed to add to cart', error);
            const msg = error.response?.data?.message || 'Failed to add to cart';
            alert(msg);
            return { success: false, message: msg };
        }
    };

    const updateQuantity = async (product_id, quantity) => {
        try {
            await api.put('/cart/update', { product_id, quantity });
            fetchCart();
        } catch (error) {
            console.error('Failed to update cart', error);
            const msg = error.response?.data?.message || 'Failed to update cart';
            alert(msg);
        }
    };

    const removeFromCart = async (product_id) => {
        try {
            await api.delete('/cart/remove', { data: { product_id } });
            fetchCart();
        } catch (error) {
            console.error('Failed to remove from cart', error);
        }
    };
    
    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, fetchCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
