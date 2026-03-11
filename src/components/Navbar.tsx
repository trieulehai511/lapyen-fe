// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { Coffee, ShoppingBag } from 'lucide-react'; // Dùng icon cho đẹp

const Navbar: React.FC = () => {
  return (
    <nav className="bg-vintage-primary text-vintage-card shadow-lg border-b-4 border-vintage-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Coffee className="h-8 w-8 text-vintage-secondary" />
            <span className="font-serif text-2xl font-bold tracking-wider text-vintage-card">
              Lapyen <span className="text-vintage-secondary italic font-light">199x</span>
            </span>
          </Link>

          {/* Menu */}
          <div className="hidden md:flex space-x-8 font-serif text-lg">
            <Link to="/" className="hover:text-vintage-secondary transition-colors duration-300">Trang chủ</Link>
            <Link to="/products" className="hover:text-vintage-secondary transition-colors duration-300">Cửa hàng</Link>
            <Link to="/categories" className="hover:text-vintage-secondary transition-colors duration-300">Bộ sưu tập</Link>
          </div>

          {/* Nút giỏ hàng/User */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-vintage-secondary text-vintage-text px-4 py-2 rounded-sm font-semibold hover:bg-vintage-card transition-colors">
              <ShoppingBag className="h-5 w-5" />
              <span>Giỏ hàng</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;