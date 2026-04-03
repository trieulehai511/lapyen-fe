// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section có Background Image. 
        Tạm dùng ảnh phong cảnh mờ của Unsplash. Hãy thay bằng link ảnh thật của cậu.
      */}
      <section 
        className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518241353330-0f7941c2d1b5?q=80&w=2000&auto=format&fit=crop')" }}
      >
        {/* Lớp phủ đen mờ để làm nổi bật cái thẻ ở giữa */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Thẻ Kính (Glassmorphism Card) giống thiết kế */}
        <div className="relative z-10 w-[90%] max-w-3xl bg-white/20 backdrop-blur-md border border-white/30 rounded-md p-10 md:p-16 text-center shadow-2xl">
          
          <p className="text-white/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Kỷ Vật Từ Quá Khứ
          </p>
          
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6 text-shadow-sm">
            Lapyen 199x: <br />
            <span className="italic font-light">Lưu giữ hoài niệm cho kẻ lữ hành.</span>
          </h1>
          
          <p className="text-white/90 text-lg font-serif italic max-w-xl mx-auto mb-10">
            Từng món đồ được thu thập từ những tàn tích của thời gian, thanh tẩy và nạp đầy năng lượng của bình yên.
          </p>

          {/* Nút bấm */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/products" 
              className="px-8 py-3 bg-[#1A202C] text-[#F5F2EB] font-serif text-sm tracking-widest uppercase hover:bg-[#2C3338] transition-colors"
            >
              Vào Cửa Hàng
            </Link>
            
            <Link 
              to="/story" 
              className="px-8 py-3 bg-transparent text-white font-serif text-sm tracking-widest uppercase border border-white hover:bg-white/10 transition-colors"
            >
              Câu Chuyện Của Chúng Tôi
            </Link>
          </div>
        </div>
      </section>

      {/* Phần trống bên dưới để bài sau làm tiếp cái "Celestial Collections" */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <h2 className="text-3xl font-serif text-[#1A202C] text-center mb-16 tracking-widest">BỘ SƯU TẬP</h2>
         <p className="text-center text-gray-500 italic">Chưa code tới phần này, kêu lão Mentor dạy tiếp...</p>
      </section>
    </div>
  );
};

export default HomePage;