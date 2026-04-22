import { motion } from 'framer-motion';

export const Skeleton = ({ className = "" }) => {
    return (
        <motion.div 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 1
            }}
            className={`bg-gray-200 rounded-md ${className}`}
        />
    );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="w-full aspect-[4/5] rounded-2xl" />
            <div className="flex flex-col gap-2 px-2">
                <div className="flex justify-between items-start">
                    <Skeleton className="w-3/5 h-6" />
                    <Skeleton className="w-1/5 h-6" />
                </div>
                <Skeleton className="w-4/5 h-4 mt-1" />
            </div>
            <div className="px-2 mt-2">
                <Skeleton className="w-full h-12 rounded-xl" />
            </div>
        </div>
    );
};
