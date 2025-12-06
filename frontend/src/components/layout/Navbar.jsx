import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import useCartStore from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import CartDrawer from '@/components/ui/CartDrawer';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cart = useCartStore((state) => state.cart);
    // Helper to get total items for badge
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Mock Auth check (replace with real auth hook later)
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled ? 'glass py-4' : 'bg-transparent py-6'
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-serif font-bold tracking-wider flex items-center gap-1">
                        EL <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, repeatDelay: 2 }}
                            className="text-accent"
                        >&</motion.span> DAMES
                    </Link>

                    <div className="hidden md:flex items-center gap-8 font-medium">
                        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                        <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
                        <Link to="/about" className="hover:text-accent transition-colors">Our Story</Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="hover:text-accent transition-colors"><Search size={20} /></button>

                        <button onClick={handleProfileClick} className="hover:text-accent transition-colors">
                            <User size={20} />
                        </button>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative hover:text-accent transition-colors"
                        >
                            <ShoppingBag size={20} />
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </button>

                        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 right-0 glass p-6 md:hidden flex flex-col gap-4"
                        >
                            <Link to="/" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                            <Link to="/shop" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                            <Link to="/about" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;
