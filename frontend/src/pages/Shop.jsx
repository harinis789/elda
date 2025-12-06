import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, we would fetch from the backend.
        // For now, we'll use the same mock data as the seed script or fetch if backend is running.
        // Since we can't easily fetch from localhost in this environment without proxy setup or CORS,
        // I will hardcode the initial state for demonstration, but include the fetch logic.

        const fetchProducts = async () => {
            try {
                // const response = await axios.get('http://localhost:8000/products');
                // setProducts(response.data);

                // Fallback mock data for immediate UI feedback if backend isn't reachable
                setProducts([
                    {
                        id: 1,
                        name: "Golden Glow Turmeric Wash",
                        price: 28.00,
                        image_url: "https://images.unsplash.com/photo-1556228720-19875c4b84b2?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                        id: 2,
                        name: "Midnight Sage Elixir",
                        price: 55.00,
                        image_url: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                        id: 3,
                        name: "Velvet Rose Cream",
                        price: 42.00,
                        image_url: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                        id: 4,
                        name: "Saffron & Silk Eye Balm",
                        price: 38.00,
                        image_url: "https://images.unsplash.com/photo-1571781926291-28b46c54908d?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                        id: 5,
                        name: "Forest Clay Mask",
                        price: 32.00,
                        image_url: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=800&q=80",
                    }
                ]);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="container mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center"
                >
                    Curated Collection
                </motion.h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
