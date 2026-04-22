import { motion } from 'framer-motion';

const AnnouncementBar = () => {
    return (
        <motion.div 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full bg-black text-white text-xs md:text-sm font-medium py-2 px-4 text-center z-50 fixed top-0 left-0 right-0 tracking-widest"
        >
            FREE SHIPPING ON ORDERS OVER $100
        </motion.div>
    );
};

export default AnnouncementBar;
