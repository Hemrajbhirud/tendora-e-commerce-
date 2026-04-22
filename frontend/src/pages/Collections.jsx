import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Collections = () => {
    const specialProducts = [
        {
            id: 'spec-1',
            name: 'Trendora Quantum Gravity Watch',
            price: 1299.99,
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
            description: 'A masterpiece of horology featuring our patented gravity-defying tourbillon mechanism. Limited to 500 pieces.',
            tag: 'Limited Edition'
        },
        {
            id: 'spec-2',
            name: 'Velocity Leather Trench',
            price: 850.00,
            image: 'https://images.unsplash.com/photo-1551028719-0141facfc129?w=800&q=80',
            description: 'Crafted from Italian hand-finished leather. The Velocity Trench combines timeless silhouette with modern weatherproofing.',
            tag: 'Exclusive'
        },
        {
            id: 'spec-3',
            name: 'Sonic Obsidian Earbuds',
            price: 299.99,
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
            description: 'Studio-grade audio encased in genuine obsidian. Active noise cancellation powered by our custom neural chip.',
            tag: 'New Arrival'
        },
        {
            id: 'spec-4',
            name: 'Architect Minimal Desk',
            price: 1450.00,
            image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
            description: 'Solid walnut meets aerospace-grade aluminum. Featuring integrated wireless charging and invisible cable management.',
            tag: 'Signature Series'
        },
        {
            id: 'spec-5',
            name: 'Aurora Minimalist Chair',
            price: 599.99,
            image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
            description: 'Ergonomic perfection wrapped in luxurious ivory fabric. The Aurora Chair defines modern relaxation.',
            tag: 'Online Exclusive'
        },
        {
            id: 'spec-6',
            name: 'Carbon Fiber Weekender Bag',
            price: 950.00,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
            description: 'Ultra-lightweight yet indestructible. The ultimate travel companion crafted entirely from woven carbon fiber.',
            tag: 'Limited Run'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
            <div className="text-center mb-16">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-heading font-bold mb-4"
                >
                    The Vault Collection
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-500 max-w-2xl mx-auto"
                >
                    A curated selection of our most exclusive, limited-run, and highly sought-after pieces.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {specialProducts.map((product, index) => (
                    <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100"
                    >
                        <div className="w-full aspect-[4/3] overflow-hidden relative bg-gray-50">
                            <span className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                                {product.tag}
                            </span>
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        
                        <div className="w-full p-8 flex flex-col justify-between flex-grow">
                            <div>
                                <h2 className="text-2xl font-bold font-heading mb-2">{product.name}</h2>
                                <p className="text-gray-500 mb-6 line-clamp-2 md:line-clamp-3">{product.description}</p>
                            </div>
                            
                            <div className="mt-auto">
                                <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
                                <button 
                                    className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 group-hover:gap-4 transition-all"
                                >
                                    <ShoppingBag size={18} />
                                    Acquire Piece
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-24 text-center p-12 bg-gray-50 rounded-3xl"
            >
                <h3 className="text-2xl font-bold font-heading mb-4">Looking for our standard catalog?</h3>
                <p className="text-gray-500 mb-6">Explore over 150 premium items across 6 categories.</p>
                <Link to="/shop" className="inline-block px-8 py-3 border-2 border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors">
                    View Full Catalog
                </Link>
            </motion.div>
        </div>
    );
};

export default Collections;
