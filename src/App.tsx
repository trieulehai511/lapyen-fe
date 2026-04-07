// src/App.tsx (Chỉ sửa phần import và Route)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProduct from './pages/admin/AddProduct';
import AdminProductList from './pages/admin/AdminProductList';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import { useAuthStore } from './store/useAuthStore';
import { useCartStore } from './store/useCartStore';
import { useEffect } from 'react';


function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const fetchCart = useCartStore(state => state.fetchCart);

  useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        }
    }, [isAuthenticated, fetchCart]);
    
  return (
    <Router>
      <div className="min-h-screen bg-[#F5F2EB] text-[#2C3338] font-sans">
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Trỏ đường dẫn /products vào Component vừa tạo */}


            <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProductList />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/products/edit/:id" element={<AddProduct />} />
              <Route path="/categories" element={<CategoryPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;