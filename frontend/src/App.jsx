import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLayout from './components/layout/AdminLayout';
import AdminProducts from './pages/admin/Products';
import AdminUsers from './pages/admin/Users';

// Layout for public pages
const PublicLayout = () => (
    <div className="min-h-screen bg-cream text-dark font-sans selection:bg-accent selection:text-white">
        <Navbar />
        <Outlet />
    </div>
);

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<div className="p-8"><h1 className="text-3xl font-serif font-bold">Dashboard Dashboard</h1><p>Welcome to the admin panel.</p></div>} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="settings" element={<div className="p-8"><h2 className="text-2xl font-bold">Settings</h2><p>Admin settings placeholder.</p></div>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
