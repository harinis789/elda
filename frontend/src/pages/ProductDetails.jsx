import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '@/components/ui/Button';
import useCartStore from '@/store/useCartStore';

const AccordionItem = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200">
            <button
                className="w-full py-4 flex items-center justify-between text-left font-serif font-medium text-lg"
                onClick={onClick}
            >
                {title}
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4 text-gray-600 leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [openSection, setOpenSection] = useState('ingredients');
    const [isExploding, setIsExploding] = useState(false);
    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        // Mock fetch based on ID
        const mockProducts = [
            {
                id: 1,
                name: "Golden Glow Turmeric Wash",
                price: 28.00,
                description: "A gentle, radiance-boosting face wash infused with organic turmeric and honey. This formula cleanses deeply without stripping natural oils, leaving your skin soft, bright, and refreshed.",
                image_url: "https://images.unsplash.com/photo-1556228720-19875c4b84b2?auto=format&fit=crop&w=800&q=80",
            },
            // Add other mock products if needed for direct navigation testing
        ];
        // Find product or default to first one for demo if ID doesn't match
        const found = mockProducts.find(p => p.id === parseInt(id)) || mockProducts[0];
        setProduct(found);
    }, [id]);

    const handleAddToCart = () => {
        setIsExploding(true);
        addToCart(product);
        setTimeout(() => setIsExploding(false), 1000);
    };

    if (!product) return <div className="min-h-screen pt-24 text-center">Loading...</div>;

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
                {/* Left: Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
                >
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Right: Details */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8 sticky top-24 h-fit"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{product.name}</h1>
                        <div className="flex items-center gap-2 text-accent mb-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">(128 Reviews)</span>
                        </div>
                        <p className="text-3xl font-bold text-dark">${product.price}</p>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        {product.description}
                    </p>

                    <div className="relative">
                        <Button
                            onClick={handleAddToCart}
                            className="w-full py-4 text-lg font-bold"
                        >
                            Add to Cart
                        </Button>

                        {/* Particle Explosion */}
                        {isExploding && (
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                                        animate={{
                                            scale: 0,
                                            opacity: 0,
                                            x: (Math.random() - 0.5) * 200,
                                            y: (Math.random() - 0.5) * 200
                                        }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="absolute w-3 h-3 bg-accent rounded-full"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <AccordionItem
                            title="Ingredients"
                            isOpen={openSection === 'ingredients'}
                            onClick={() => setOpenSection(openSection === 'ingredients' ? '' : 'ingredients')}
                        >
                            <p>
                                Aqua, <span className="font-bold text-accent">Organic Turmeric Root Extract</span>, Honey, Aloe Vera Juice, Glycerin, Coco-Glucoside, <span className="font-bold text-accent">Saffron Extract</span>, Vitamin E, Essential Oils.
                            </p>
                        </AccordionItem>
                        <AccordionItem
                            title="How to Use"
                            isOpen={openSection === 'usage'}
                            onClick={() => setOpenSection(openSection === 'usage' ? '' : 'usage')}
                        >
                            <p>
                                Apply a small amount to damp skin. Massage gently in circular motions for 60 seconds. Rinse thoroughly with lukewarm water. Use morning and night for best results.
                            </p>
                        </AccordionItem>
                        <AccordionItem
                            title="Shipping & Returns"
                            isOpen={openSection === 'shipping'}
                            onClick={() => setOpenSection(openSection === 'shipping' ? '' : 'shipping')}
                        >
                            <p>
                                Free shipping on orders over $50. Returns accepted within 30 days of purchase if the product is unused and in original packaging.
                            </p>
                        </AccordionItem>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetails;
