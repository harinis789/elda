import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Button from './Button';
import useCartStore from '@/store/useCartStore';

const ProductCard = ({ product }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[400px] w-full rounded-xl bg-white/5 border border-white/10 p-6 cursor-pointer group"
        >
            <div
                style={{ transform: "translateZ(75px)" }}
                className="absolute inset-4 rounded-xl overflow-hidden shadow-2xl"
            >
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute bottom-8 left-8 right-8"
            >
                <h3 className="text-2xl font-serif font-bold text-white mb-2 shadow-black/50 drop-shadow-lg">{product.name}</h3>
                <p className="text-accent font-bold text-xl mb-4 shadow-black/50 drop-shadow-lg">${product.price}</p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                    <Button
                        className="w-full flex items-center justify-center gap-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                    >
                        <ShoppingCart size={18} /> Add to Cart
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
