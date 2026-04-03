// src/components/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore'; 

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#F5F2EB]/90 backdrop-blur-md border-b border-[#E0Dcd2]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo Left */}
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-[#1A202C]">
          lapyen <span className="italic font-light">1997</span>
        </Link>

        {/* Menu Center (Desktop) */}
        <div className="hidden md:flex space-x-10 font-serif text-sm tracking-widest uppercase text-[#4A5568]">
          <Link to="/products" className={`hover:text-[#1A202C] transition-colors pb-1 ${isActive('/products') ? 'border-b border-[#1A202C] text-[#1A202C]' : ''}`}>
            Cửa Hàng
          </Link>
          <Link to="/categories" className={`hover:text-[#1A202C] transition-colors pb-1 ${isActive('/categories') ? 'border-b border-[#1A202C] text-[#1A202C]' : ''}`}>
            Bộ Sưu Tập
          </Link>
          <Link to="/story" className={`hover:text-[#1A202C] transition-colors pb-1 ${isActive('/story') ? 'border-b border-[#1A202C] text-[#1A202C]' : ''}`}>
            Câu Chuyện
          </Link>
        </div>

        {/* Icons Right */}
        <div className="flex items-center space-x-6 text-[#4A5568]">
          {/* Search bar mini */}
          <div className="hidden lg:flex items-center border-b border-[#A0AEC0] pb-1">
            <Search className="w-4 h-4 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all duration-300 placeholder-[#A0AEC0]"
            />
          </div>

          <button className="hover:text-[#1A202C] transition relative">
            <ShoppingBag className="w-5 h-5" />
            {/* Chấm đỏ báo có hàng (giả lập) */}
            <span className="absolute -top-1 -right-1 bg-[#2C3338] w-2 h-2 rounded-full"></span>
          </button>

          {isAuthenticated ? (
            <button onClick={logout} className="text-sm font-serif underline hover:text-[#1A202C] transition">
              Rời Tiệm
            </button>
          ) : (
            <Link to="/login" className="hover:text-[#1A202C] transition">
              <User className="w-5 h-5" />
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;