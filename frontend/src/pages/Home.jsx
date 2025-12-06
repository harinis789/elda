import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const Home = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const rotateImage = useTransform(scrollYProgress, [0, 1], [0, 10]);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section ref={targetRef} className="h-screen relative overflow-hidden flex items-center justify-center bg-primary">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div style={{ y: yText }} className="text-white space-y-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-6xl md:text-8xl font-serif font-bold leading-tight"
                        >
                            Nature's <span className="text-accent">Gold</span> for your Soul
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl text-white/80 max-w-lg"
                        >
                            Experience the luxury of organic, turmeric-infused skincare designed to make you glow from within.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Link to="/shop">
                                <Button className="flex items-center gap-2 text-lg px-8 py-4">
                                    Shop Collection <ArrowRight size={20} />
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div style={{ y: yImage, rotate: rotateImage }} className="relative hidden md:block">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
                            alt="Luxury Skincare Bottle"
                            className="w-full max-w-md mx-auto drop-shadow-2xl rounded-2xl"
                        />
                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 backdrop-blur-md rounded-full"
                        />
                        <motion.div
                            animate={{ y: [0, 30, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 backdrop-blur-md rounded-full"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Marquee */}
            <div className="bg-accent py-4 overflow-hidden whitespace-nowrap">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex gap-8 text-dark font-bold text-xl tracking-widest"
                >
                    {Array(10).fill("ORGANIC • VEGAN • CRUELTY-FREE • LUXURY • ").map((text, i) => (
                        <span key={i}>{text}</span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
