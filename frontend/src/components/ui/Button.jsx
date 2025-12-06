import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Button = ({ children, className, onClick, variant = 'primary', ...props }) => {
    const variants = {
        primary: 'bg-accent text-white shadow-lg shadow-accent/30',
        outline: 'border-2 border-accent text-accent hover:bg-accent/10',
        ghost: 'text-dark hover:bg-black/5',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                'px-6 py-3 rounded-xl font-medium transition-colors relative overflow-hidden',
                variants[variant],
                className
            )}
            onClick={onClick}
            {...props}
        >
            {variant === 'primary' && (
                <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                />
            )}
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export default Button;
