import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-12 rounded-t-[2.5rem] mt-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div>
                        <h3 className="text-2xl font-heading font-bold mb-6 tracking-tighter">TRENDORA</h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Discover the future of shopping. Premium products designed for creators and trendsetters who want minimal, luxury aesthetics in their daily lives.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-6 flex items-center gap-1">Company <ArrowUpRight size={14} className="text-gray-500" /></h4>
                        <ul className="flex flex-col gap-3 text-sm text-gray-400">
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link to="/store-locator" className="hover:text-white transition-colors">Store Locator</Link></li>
                            <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-6 flex items-center gap-1">Support <ArrowUpRight size={14} className="text-gray-500" /></h4>
                        <ul className="flex flex-col gap-3 text-sm text-gray-400">
                            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-6 flex items-center gap-1">Legal <ArrowUpRight size={14} className="text-gray-500" /></h4>
                        <ul className="flex flex-col gap-3 text-sm text-gray-400">
                            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
                        </ul>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-gray-500">
                    <p>© 2026 Trendora Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">TikTok</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
