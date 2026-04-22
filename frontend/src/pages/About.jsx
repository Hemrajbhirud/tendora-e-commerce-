import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6">About Trendora</h1>
                <p className="text-xl text-gray-500 leading-relaxed">
                    We are redefining the ecommerce experience with an unapologetic focus on aesthetics, premium quality, and seamless design. 
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img 
                        src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1200&q=80" 
                        alt="Our Vision" 
                        className="rounded-3xl shadow-xl w-full object-cover aspect-[4/5]"
                    />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-4">Our Vision</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Founded in 2026, Trendora was built on a simple premise: shopping online should feel just as curated and immersive as walking into a flagship luxury store. We obsess over every pixel, every animation, and every product we carry to ensure you get nothing but the absolute best.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-4">The Collection</h2>
                        <p className="text-gray-600 leading-relaxed">
                            From cutting-edge Tech to timeless Fashion pieces, our catalog is meticulously sourced from global creators who share our passion for minimalism and utility. We don't just sell products; we deliver a lifestyle.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <div className="grid grid-cols-3 gap-6 text-center">
                            <div>
                                <p className="text-4xl font-bold font-heading text-accent mb-2">150+</p>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Premium Items</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold font-heading text-accent mb-2">6</p>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Categories</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold font-heading text-accent mb-2">24/7</p>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Support</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
