import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: 1,
        stock: 0,
        image_url: ''
    });

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                category_id: product.category_id,
                stock: product.stock,
                image_url: product.image_url
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                category_id: 1,
                stock: 0,
                image_url: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await api.put(`/products/${editingProduct.id}`, formData);
            } else {
                await api.post('/products', formData);
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error("Error saving product", error);
            alert("Failed to save product");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product", error);
                alert("Failed to delete product");
            }
        }
    };

    if (loading) {
        return <div className="py-20 text-center text-gray-500">Loading products...</div>;
    }

    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] overflow-hidden">
            <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-100">
                <h2 className="text-2xl font-bold">Product Catalog</h2>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full font-medium hover:bg-black/80 transition-colors"
                >
                    <Plus size={18} /> Add Product
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="py-4 px-6 font-semibold text-sm text-gray-500 w-16">ID</th>
                            <th className="py-4 px-6 font-semibold text-sm text-gray-500 w-20">Image</th>
                            <th className="py-4 px-6 font-semibold text-sm text-gray-500">Name</th>
                            <th className="py-4 px-6 font-semibold text-sm text-gray-500">Price</th>
                            <th className="py-4 px-6 font-semibold text-sm text-gray-500">Stock</th>
                            <th className="py-4 px-6 font-semibold text-sm text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 text-sm text-gray-500">#{product.id}</td>
                                <td className="py-4 px-6">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="py-4 px-6 font-medium max-w-xs truncate">{product.name}</td>
                                <td className="py-4 px-6 text-sm font-medium">${(Number(product.price)).toFixed(2)}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                        product.stock > 10 ? 'bg-green-100 text-green-700' :
                                        product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {product.stock} in stock
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button 
                                            onClick={() => handleOpenModal(product)}
                                            className="text-gray-400 hover:text-black transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-gray-500">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                        <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h2 className="text-2xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    required 
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-black transition-colors"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea 
                                    name="description" 
                                    value={formData.description} 
                                    onChange={handleInputChange} 
                                    required 
                                    rows={4}
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-black transition-colors"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                                    <input 
                                        type="number" 
                                        step="0.01" 
                                        name="price" 
                                        value={formData.price} 
                                        onChange={handleInputChange} 
                                        required 
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                                    <input 
                                        type="number" 
                                        name="stock" 
                                        value={formData.stock} 
                                        onChange={handleInputChange} 
                                        required 
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category ID (1-6)</label>
                                    <input 
                                        type="number" 
                                        name="category_id" 
                                        value={formData.category_id} 
                                        onChange={handleInputChange} 
                                        min="1" max="6"
                                        required 
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                    <input 
                                        type="url" 
                                        name="image_url" 
                                        value={formData.image_url} 
                                        onChange={handleInputChange} 
                                        required 
                                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>
                            </div>
                            
                            <div className="pt-4 flex justify-end gap-4 border-t border-gray-100 mt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-black/80 transition-colors"
                                >
                                    {editingProduct ? 'Save Changes' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
