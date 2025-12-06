import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';

const Admin = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [products, setProducts] = useState([
        { id: 1, name: "Golden Glow Turmeric Wash", price: 28.00, category: "Face Wash" },
        { id: 2, name: "Midnight Sage Elixir", price: 55.00, category: "Oils" },
        { id: 3, name: "Velvet Rose Cream", price: 42.00, category: "Moisturizers" },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        setIsDrawerOpen(false);
    };

    return (
        <div className="min-h-screen pt-24 px-6 bg-gray-50">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-primary">Product Dashboard</h1>
                    <Button onClick={() => setIsDrawerOpen(true)} className="flex items-center gap-2">
                        <Plus size={20} /> Add New Product
                    </Button>
                </div>

                {/* Product Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 font-serif font-bold text-dark">Product Name</th>
                                <th className="p-6 font-serif font-bold text-dark">Category</th>
                                <th className="p-6 font-serif font-bold text-dark">Price</th>
                                <th className="p-6 font-serif font-bold text-dark">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6 font-medium">{product.name}</td>
                                    <td className="p-6 text-gray-600">{product.category}</td>
                                    <td className="p-6 font-bold text-accent">${product.price}</td>
                                    <td className="p-6"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Drawer Form */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDrawerOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 p-8 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-serif font-bold">New Product</h2>
                                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="e.g. Golden Glow Wash" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                                    <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="0.00" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all">
                                        <option>Face Wash</option>
                                        <option>Scrubs</option>
                                        <option>Oils</option>
                                        <option>Moisturizers</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="Product description..."></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                    <div className="flex gap-2">
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="https://..." />
                                        <button type="button" className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                            <ImageIcon size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button type="submit" className="w-full py-4">Create Product</Button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admin;
