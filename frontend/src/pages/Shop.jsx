import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ui/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { motion } from 'framer-motion';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                if (categoryId) {
                    setProducts(data.filter(p => p.category_id === parseInt(categoryId)));
                } else {
                    // Mix products globally so you see all categories naturally
                    const shuffled = [...data].sort(() => 0.5 - Math.random());
                    setProducts(shuffled);
                }
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [categoryId]);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
                    {categoryId ? 'Category Collection' : 'All Products'}
                </h1>
                <p className="text-gray-500 mt-4">Discover our curated selection of premium gear.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
                >
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-500">
                            No products found matching your criteria.
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default Shop;
