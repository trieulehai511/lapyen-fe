import { Grid, LayoutDashboard, LogOut, Package, Users } from 'lucide-react';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminDashboard: React.FC = () => {

    const location = useLocation();
    const isActive = (path:string) => location.pathname == path;


    
    return (
        <div className="flex min-h-screen bg-[#F8F5EF] text-[#1A202C] font-sans">
            
            {/* Sidebar Cổ Điển */}
            <aside className="w-64 border-r border-[#DED6C4] bg-[#EBE7DF] flex flex-col shadow-lg z-10">
                <div className="p-6">
                    <h2 className="text-2xl font-serif font-bold mb-2 text-[#1A202C] text-center italic">
                        Lapyen
                    </h2>
                    <p className="text-xs text-center text-[#8B8378] tracking-[0.2em] uppercase mb-8 border-b border-[#DED6C4] pb-4">
                        Kho Lưu Trữ
                    </p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link 
                        to="/admin" 
                        className={`flex items-center gap-3 p-3 rounded-sm transition-colors ${isActive('/admin') ? 'bg-[#1A202C] text-[#F5F2EB]' : 'text-[#4A5568] hover:bg-[#DED6C4]'}`}
                    >
                        <LayoutDashboard size={18} /> <span className="text-sm tracking-widest uppercase">Tổng quan</span>
                    </Link>
                    
                    <Link 
                        to="/admin/products" 
                        className={`flex items-center gap-3 p-3 rounded-sm transition-colors ${isActive('/admin/products') ? 'bg-[#1A202C] text-[#F5F2EB]' : 'text-[#4A5568] hover:bg-[#DED6C4]'}`}
                    >
                        <Package size={18} /> <span className="text-sm tracking-widest uppercase">Thánh tích</span>
                    </Link>

                    <Link 
                        to="/admin/categories" 
                        className={`flex items-center gap-3 p-3 rounded-sm transition-colors ${isActive('/admin/categories') ? 'bg-[#1A202C] text-[#F5F2EB]' : 'text-[#4A5568] hover:bg-[#DED6C4]'}`}
                    >
                        <Grid size={18} /> <span className="text-sm tracking-widest uppercase">Phân loại</span>
                    </Link>

                    <Link 
                        to="/admin/users" 
                        className={`flex items-center gap-3 p-3 rounded-sm transition-colors ${isActive('/admin/users') ? 'bg-[#1A202C] text-[#F5F2EB]' : 'text-[#4A5568] hover:bg-[#DED6C4]'}`}
                    >
                        <Users size={18} /> <span className="text-sm tracking-widest uppercase">Khách hàng</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-[#DED6C4]">
                    <button className="flex w-full items-center gap-3 p-3 text-red-800 hover:bg-red-50 rounded-sm transition-colors">
                        <LogOut size={18} /> <span className="text-sm tracking-widest uppercase font-bold">Thoát quyền</span>
                    </button>
                </div>
            </aside>

            {/* Nội dung chính: CÁI LỖ HỔNG OUTLET Ở ĐÂY */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header chung trên cùng */}
                <header className="bg-white border-b border-[#DED6C4] px-10 py-4 flex justify-between items-center shrink-0">
                    <h1 className="text-xl font-serif text-[#1A202C] italic">Bảng Tổng Sắp Hệ Thống</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-[#8B8378]">Chào mừng, <strong className="text-[#1A202C]">Đại Pháp Sư</strong></span>
                    </div>
                </header>

                {/* Khu vực render các component con (có thanh cuộn riêng) */}
                <div className="flex-1 overflow-auto p-10">
                    <Outlet /> {/* <-- ĐIỂM SỐNG CÒN LÀ ĐÂY */}
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard