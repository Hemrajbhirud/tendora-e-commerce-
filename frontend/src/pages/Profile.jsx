import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Package } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/user');
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-2">My Account</h1>
                    <p className="text-gray-500">Welcome back, {user.name}.</p>
                </div>
                <div className="flex gap-4">
                    {user.role === 'admin' && (
                        <button 
                            onClick={() => navigate('/admin')}
                            className="bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent/80 transition-colors"
                        >
                            Admin Dashboard
                        </button>
                    )}
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 border border-gray-200 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Package size={24} /> Order History
                </h2>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="flex flex-col gap-8">
                        {orders.map(order => (
                            <div key={order.id} className="border border-gray-200 rounded-[2rem] p-6 md:p-8 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-100 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Order #{order.id}</p>
                                        <p className="font-medium">{new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 mb-1">Total</p>
                                            <p className="font-bold text-lg">${(Number(order.total)).toFixed(2)}</p>
                                        </div>
                                        <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                                            order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {order.status}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {order.items?.map(item => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                                                <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-[2rem] p-12 text-center">
                        <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                        <button onClick={() => navigate('/shop')} className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-black/80 transition-colors">
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
