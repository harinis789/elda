import { useState } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';

// Mock Data (In a real app, fetch from backend)
const INITIAL_PRODUCTS = [
    { id: 1, name: 'Golden Glow Serum', price: 45, stock: 120, status: 'In Stock', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop' },
    { id: 2, name: 'Forest Mist Toner', price: 32, stock: 45, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1780&auto=format&fit=crop' },
    { id: 3, name: 'Velvet Night Cream', price: 58, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=1926&auto=format&fit=crop' },
];

const AdminProducts = () => {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const onAddProduct = (data) => {
        const newProduct = {
            id: products.length + 1,
            ...data,
            price: parseFloat(data.price),
            stock: parseInt(data.stock),
            status: parseInt(data.stock) > 10 ? 'In Stock' : parseInt(data.stock) > 0 ? 'Low Stock' : 'Out of Stock',
        };
        // Update local state (and ideally sync with global store/backend)
        setProducts([...products, newProduct]);
        setIsAddModalOpen(false);
        reset();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">Products</h2>
                    <p className="text-gray-500">Manage your inventory</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
                    <Plus size={18} /> Add Product
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Product</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Price</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Stock Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-medium text-gray-900">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">${product.price}</td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-xs font-medium",
                                        product.status === 'In Stock' ? "bg-green-100 text-green-700" :
                                            product.status === 'Low Stock' ? "bg-yellow-100 text-yellow-700" :
                                                "bg-red-100 text-red-700"
                                    )}>
                                        {product.status} ({product.stock})
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-accent transition-colors"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[80] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-xl z-[90] p-8"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold font-serif">Add New Product</h3>
                                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSubmit(onAddProduct)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input {...register("name", { required: true })} className="w-full px-4 py-2 border rounded-lg focus:ring-accent focus:border-accent outline-none" placeholder="e.g. Lavender Mist" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                        <input type="number" step="0.01" {...register("price", { required: true })} className="w-full px-4 py-2 border rounded-lg focus:ring-accent focus:border-accent outline-none" placeholder="0.00" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                        <input type="number" {...register("stock", { required: true })} className="w-full px-4 py-2 border rounded-lg focus:ring-accent focus:border-accent outline-none" placeholder="0" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input {...register("image")} className="w-full px-4 py-2 border rounded-lg focus:ring-accent focus:border-accent outline-none" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea {...register("description")} className="w-full px-4 py-2 border rounded-lg focus:ring-accent focus:border-accent outline-none" rows="3" placeholder="Product details..."></textarea>
                                </div>

                                <Button type="submit" className="w-full mt-4">Save Product</Button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminProducts;
