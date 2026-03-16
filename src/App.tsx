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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-vintage-bg text-vintage-text font-sans selection:bg-vintage-secondary selection:text-vintage-text">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/" element={
              <div className="text-center mt-20">
                <h1 className="text-5xl font-serif text-vintage-primary mb-4">Chào mừng đến với Lapyen</h1>
                <p className="text-lg italic text-vintage-primary/80">Nơi lưu giữ những giá trị hoài niệm...</p>
              </div>
            } />
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