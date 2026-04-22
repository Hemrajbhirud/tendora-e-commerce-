import { BarChart3, Package, Users, DollarSign } from 'lucide-react';

const AdminOverview = ({ analytics, orders }) => {
    return (
        <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-8 flex items-center gap-6">
                    <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shrink-0">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
                        <p className="text-2xl font-bold">${(Number(analytics?.summary?.totalRevenue || 0)).toFixed(2)}</p>
                    </div>
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-8 flex items-center gap-6">
                    <div className="w-14 h-14 bg-accent text-white rounded-2xl flex items-center justify-center shrink-0">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Total Orders</p>
                        <p className="text-2xl font-bold">{analytics?.summary?.totalOrders || 0}</p>
                    </div>
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-8 flex items-center gap-6">
                    <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center shrink-0">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Total Users</p>
                        <p className="text-2xl font-bold">{analytics?.summary?.totalUsers || 0}</p>
                    </div>
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-8 flex items-center gap-6">
                    <div className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center shrink-0">
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Avg Order Value</p>
                        <p className="text-2xl font-bold">
                            ${analytics?.summary?.totalOrders > 0 
                                ? (Number(analytics.summary.totalRevenue) / Number(analytics.summary.totalOrders)).toFixed(2) 
                                : '0.00'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Recent Orders */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
                    <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="py-4 px-6 font-semibold text-sm text-gray-500">Order ID</th>
                                        <th className="py-4 px-6 font-semibold text-sm text-gray-500">Customer</th>
                                        <th className="py-4 px-6 font-semibold text-sm text-gray-500">Date</th>
                                        <th className="py-4 px-6 font-semibold text-sm text-gray-500">Total</th>
                                        <th className="py-4 px-6 font-semibold text-sm text-gray-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.slice(0, 10).map((order) => (
                                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6 font-medium">#{order.id}</td>
                                            <td className="py-4 px-6 text-sm">{order.name} <span className="block text-xs text-gray-500">{order.email}</span></td>
                                            <td className="py-4 px-6 text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="py-4 px-6 font-medium">${(Number(order.total)).toFixed(2)}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="py-8 text-center text-gray-500">No orders found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="lg:col-span-1">
                    <h2 className="text-2xl font-bold mb-6">Top Products (Views)</h2>
                    <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-6">
                        <div className="flex flex-col gap-6">
                            {analytics?.topProducts?.map((product, index) => (
                                <div key={product.id} className="flex gap-4 items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                                        <p className="text-accent text-xs mt-1 font-semibold">{product.total_sold} sold</p>
                                    </div>
                                </div>
                            ))}
                            {(!analytics?.topProducts || analytics.topProducts.length === 0) && (
                                <p className="text-gray-500 text-center py-4">Not enough data.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminOverview;
