import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, User, Globe, Menu, X } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-8 left-0 right-0 z-40 mx-auto max-w-7xl px-4 md:px-8 transition-all duration-300 ${
                    scrolled ? 'top-4' : 'top-10'
                }`}
            >
                <div className="glass rounded-full px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-2xl font-heading font-bold tracking-tighter">
                        TRENDORA
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
                        <Link to="/shop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-accent transition-colors">Shop</Link>
                        <Link to="/collections" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-accent transition-colors">Collections</Link>

                        <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-accent transition-colors">About</Link>
                    </nav>

                    {/* Icons */}
                    <div className="hidden md:flex items-center gap-5">
                        <button className="hover:text-accent transition-colors"><Search size={20} strokeWidth={1.5} /></button>
                        <button className="hover:text-accent transition-colors"><Globe size={20} strokeWidth={1.5} /></button>
                        <Link to={user ? "/profile" : "/login"} className="hover:text-accent transition-colors">
                            <User size={20} strokeWidth={1.5} />
                        </Link>
                        <Link to="/cart" className="relative hover:text-accent transition-colors">
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex md:hidden items-center gap-4">
                        <Link to="/cart" className="relative hover:text-accent transition-colors">
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setMobileMenuOpen(true)}>
                            <Menu size={24} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-50 bg-white p-6 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-12">
                            <Link to="/" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="text-2xl font-heading font-bold tracking-tighter">
                                TRENDORA
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <nav className="flex flex-col gap-6 text-2xl font-heading font-medium">
                            <Link to="/shop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Shop</Link>
                            <Link to="/collections" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Collections</Link>

                            <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About</Link>
                            <div className="h-[1px] bg-border w-full my-4"></div>
                            <Link to={user ? "/profile" : "/login"}>Account</Link>
                            <Link to="/cart">Cart ({cartItemCount})</Link>
                        </nav>
                        
                        <div className="mt-auto pb-8">
                            <p className="text-muted-foreground text-sm uppercase tracking-widest">Discover the Future</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
