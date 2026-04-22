import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import api from '../services/api';

const Home = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const { scrollYProgress } = useScroll();
    
    // Parallax effect for hero
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                // Fetch first 8 products for trending
                const { data } = await api.get('/products');
                setTrendingProducts(data.slice(0, 8));
            } catch (error) {
                console.error("Error fetching trending products", error);
            }
        };
        fetchTrending();
    }, []);

    const categories = [
        { id: 1, name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80' },
        { id: 2, name: 'Accessories', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80' },
        { id: 3, name: 'Tech', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80' },
        { id: 4, name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
        { id: 5, name: 'Home', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80' },
        { id: 6, name: 'Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80' }
    ];

    const collections = [
        { id: 1, name: 'Spring Collection \'26', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80' },
        { id: 2, name: 'Limited Edition', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80' },
        { id: 3, name: 'Best Sellers', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80' },
    ];

    return (
        <div className="w-full">
            {/* 3. Hero Section */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center -mt-24">
                <motion.div 
                    style={{ y, opacity }}
                    className="absolute inset-0 w-full h-full z-0"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=2000&q=80" 
                        alt="Trendora Abstract Background" 
                        className="w-full h-full object-cover filter brightness-[0.85]"
                    />
                </motion.div>
                
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto text-white pt-20">
                    <motion.h1 
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-7xl md:text-9xl font-heading font-bold tracking-tighter mb-4"
                    >
                        TRENDORA
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl md:text-3xl font-light mb-12 tracking-wide"
                    >
                        Discover the Future of Shopping
                    </motion.p>
                    
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link 
                            to="/shop" 
                            className="bg-white text-black px-10 py-5 rounded-full font-medium text-lg hover:bg-black hover:text-white transition-colors duration-300 inline-flex flex-col items-center shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                        >
                            Shop Now
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* 4. Featured Product Showcase */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[2.5rem] bg-gray-50 overflow-hidden flex flex-col md:flex-row items-center"
                >
                    <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh]">
                        <img 
                            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=80" 
                            alt="Trendora Air Backpack" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                        <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4">Featured</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6">
                            Trendora Air Backpack
                        </h2>
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                            Lightweight. Minimal. Designed for creators. The ultimate everyday carry that adapts to your journey while organizing your tech effortlessly.
                        </p>
                        <Link to="/shop" className="inline-flex items-center gap-2 border-b-2 border-black pb-1 w-max font-medium hover:text-accent hover:border-accent transition-colors">
                            Explore Product <ArrowRight size={20} />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* 5. Trending Products Grid */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">Trending Now</h2>
                    <Link to="/shop" className="hidden md:inline-flex items-center gap-2 border-b border-black pb-1 hover:text-accent transition-colors">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
                    {trendingProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* 6. Categories Section */}
            <section className="py-24 bg-gray-50">
                <div className="px-4 md:px-8 max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-16 text-center">Shop by Category</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <motion.div 
                                key={category.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link to={`/shop?category=${category.id}`} className="group block relative h-80 rounded-[2rem] overflow-hidden">
                                    <img 
                                        src={category.image} 
                                        alt={category.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                                    <h3 className="absolute inset-0 flex items-center justify-center text-3xl font-heading font-bold text-white tracking-wide">
                                        {category.name}
                                    </h3>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Collections Section */}
            <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-16">Curated Collections</h2>
                
                <div className="flex gap-6 overflow-x-auto pb-10 snap-x hide-scrollbar scroll-smooth">
                    {collections.map(collection => (
                        <div key={collection.id} className="min-w-[85vw] md:min-w-[40vw] h-[60vh] snap-center rounded-[2.5rem] overflow-hidden relative group cursor-pointer shrink-0">
                            <img 
                                src={collection.image} 
                                alt={collection.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-10 left-10 text-white">
                                <h3 className="text-3xl font-heading font-bold mb-4">{collection.name}</h3>
                                <Link to="/collections" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
                                    Explore <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 8. Brand Story Section */}
            <section className="py-32 bg-black text-white px-4 md:px-8 text-center flex flex-col items-center justify-center min-h-[60vh]">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl"
                >
                    <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-8 block">Our Story</span>
                    <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-wide">
                        Trendora is built for <i className="font-serif">creators</i> and <i className="font-serif">trendsetters</i> who want products that combine technology, style, and simplicity.
                    </h2>
                </motion.div>
            </section>

            {/* 9. Customer Reviews Section */}
            <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-16 text-center">Loved by Thousands</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-white border text-center border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-10"
                        >
                            <div className="flex justify-center gap-1 text-accent mb-6">
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                            </div>
                            <p className="text-lg text-gray-700 mb-8 italic">"The quality and attention to detail is unmatched. Easily the best purchase I've made this year."</p>
                            <div>
                                <h4 className="font-semibold">— Sarah Jenkins</h4>
                                <span className="text-sm text-gray-500">Verified Buyer</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 10. Newsletter Signup */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto bg-gray-100 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4">Join the Trendora Community</h2>
                        <p className="text-gray-600 mb-10 max-w-lg mx-auto">Get early access to new collections, exclusive drops, and 10% off your first order.</p>
                        
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-grow px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-accent bg-white"
                                required 
                            />
                            <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-black/80 transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
