import React from 'react';
import { LayoutDashboard, Package, Users,LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    return (
        <div className="flex min-h-[80vh] bg-vintage-card border-2 border-vintage-primary shadow-2xl">
            {/* Sidebar Cổ Điển */}
            <aside className="w-64 border-r-2 border-vintage-primary p-6 bg-vintage-primary text-vintage-bg">
                <h2 className="text-2xl font-serif font-bold mb-10 border-b border-vintage-bg/30 pb-4 text-center">
                    Quản Trị Viên
                </h2>
                <nav className="space-y-4 font-serif">
                    <Link to="/admin" className="flex items-center gap-3 p-3 bg-vintage-bg text-vintage-primary rounded-sm shadow-md">
                        <LayoutDashboard size={20} /> Tổng quan
                    </Link>
                    <Link to="/admin/products" className="flex items-center gap-3 p-3 hover:bg-vintage-bg/20 transition-all">
                        <Package size={20} /> Kho hàng
                    </Link>
                    <Link to="/admin/users" className="flex items-center gap-3 p-3 hover:bg-vintage-bg/20 transition-all">
                        <Users size={20} /> Khách hàng
                    </Link>
                    <div className="pt-10">
                        <button className="flex items-center gap-3 p-3 text-red-300 hover:text-red-100 transition-all">
                            <LogOut size={20} /> Thoát quyền
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Nội dung chính */}
            <main className="flex-1 p-10">
                <header className="mb-10">
                    <h1 className="text-4xl font-serif text-vintage-primary italic">Bảng Tổng Sắp Hệ Thống</h1>
                    <p className="text-vintage-secondary mt-2 text-lg">Chào mừng trở lại, người quản lý.</p>
                </header>

                {/* Thống kê nhanh */}
                <div className="grid grid-cols-3 gap-8">
                    {[
                        { label: 'Sản phẩm', value: '124', color: 'bg-blue-100' },
                        { label: 'Đơn hàng', value: '18', color: 'bg-green-100' },
                        { label: 'Doanh thu', value: '15.2M', color: 'bg-yellow-100' }
                    ].map((item, idx) => (
                        <div key={idx} className="p-6 border-2 border-vintage-secondary rounded-sm bg-white/50">
                            <p className="font-serif text-vintage-secondary uppercase text-sm tracking-widest">{item.label}</p>
                            <p className="text-4xl font-bold text-vintage-primary mt-2">{item.value}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;