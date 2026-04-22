import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AdminOverview from '../components/admin/AdminOverview';
import AdminProducts from '../components/admin/AdminProducts';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [analytics, setAnalytics] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }

        const fetchAdminData = async () => {
            try {
                const [analyticsRes, ordersRes] = await Promise.all([
                    api.get('/admin/analytics'),
                    api.get('/admin/orders')
                ]);
                setAnalytics(analyticsRes.data);
                setOrders(ordersRes.data);
            } catch (error) {
                console.error("Error fetching admin data", error);
            } finally {
                setLoading(false);
            }
        };

        if (activeTab === 'overview') {
            fetchAdminData();
        } else {
            setLoading(false);
        }
    }, [user, navigate, activeTab]);

    if (!user || user.role !== 'admin') return null;

    if (loading) return <div className="h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div></div>;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Admin Dashboard</h1>
                
                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-full overflow-hidden">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${activeTab === 'overview' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-black'}`}
                    >
                        Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('products')}
                        className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${activeTab === 'products' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-black'}`}
                    >
                        Products
                    </button>
                </div>
            </div>

            {activeTab === 'overview' && (
                <AdminOverview analytics={analytics} orders={orders} />
            )}

            {activeTab === 'products' && (
                <AdminProducts />
            )}
        </div>
    );
};

export default AdminDashboard;
