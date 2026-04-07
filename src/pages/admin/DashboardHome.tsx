// src/pages/admin/DashboardHome.tsx
import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, Wallet, AlertCircle, ArrowUpRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Định dạng tiền
const priceFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

const DashboardHome: React.FC = () => {
    const [loading, setLoading] = useState(true);
    
    // State chứa dữ liệu tổng hợp
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0
    });

    // State chứa danh sách hàng sắp hết (stock < 5)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [lowStockItems, setLowStockItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setTimeout(() => {
                    setStats({
                        totalProducts: 142,
                        totalOrders: 28,
                        totalRevenue: 15450000
                    });
                    
                    setLowStockItems([
                        { id: '1', name: 'Muối hồng Aethelgard', stock: 2, price: 150000 },
                        { id: '2', name: 'Lông vũ thiên thần sa ngã', stock: 0, price: 5000000 },
                        { id: '3', name: 'Bột ngọc trai đen', stock: 4, price: 850000 },
                    ]);
                    
                    setLoading(false);
                }, 800);

            } catch (error) {
                console.error("Lỗi khi tải dữ liệu thống kê", error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-[#8B8378]">
                <Loader2 className="animate-spin mb-4 text-[#1A202C]" size={40} />
                <p className="font-serif italic">Đang tổng hợp sổ sách kinh doanh...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            
            {/* Khối Thống kê (Quick Stats) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Thẻ Sản phẩm */}
                <div className="bg-white border border-[#DED6C4] p-6 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-[#F8F5EF] group-hover:scale-110 transition-transform">
                        <Package size={120} />
                    </div>
                    <div className="relative z-10">
                        <p className="font-sans text-[#8B8378] uppercase text-[11px] font-bold tracking-widest mb-1 flex items-center gap-2">
                            <Package size={14} /> Tổng Thánh Tích
                        </p>
                        <h3 className="text-4xl font-serif font-bold text-[#1A202C]">{stats.totalProducts}</h3>
                        <p className="text-xs text-[#8B8378] mt-4 italic">+12 vật phẩm mới trong tháng</p>
                    </div>
                </div>

                {/* Thẻ Đơn hàng */}
                <div className="bg-white border border-[#DED6C4] p-6 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-[#F8F5EF] group-hover:scale-110 transition-transform">
                        <ShoppingCart size={120} />
                    </div>
                    <div className="relative z-10">
                        <p className="font-sans text-[#8B8378] uppercase text-[11px] font-bold tracking-widest mb-1 flex items-center gap-2">
                            <ShoppingCart size={14} /> Giao Ước Đã Lập
                        </p>
                        <h3 className="text-4xl font-serif font-bold text-[#1A202C]">{stats.totalOrders}</h3>
                        <p className="text-xs text-[#8B8378] mt-4 italic">5 đơn hàng đang chờ xử lý</p>
                    </div>
                </div>

                {/* Thẻ Doanh thu */}
                <div className="bg-[#1A202C] border border-[#1A202C] p-6 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-white/5 group-hover:scale-110 transition-transform">
                        <Wallet size={120} />
                    </div>
                    <div className="relative z-10">
                        <p className="font-sans text-[#DED6C4] uppercase text-[11px] font-bold tracking-widest mb-1 flex items-center gap-2">
                            <Wallet size={14} /> Vàng Thu Thập
                        </p>
                        <h3 className="text-4xl font-serif font-bold text-[#F5F2EB]">{priceFormatter.format(stats.totalRevenue)}</h3>
                        <p className="text-xs text-[#8B8378] mt-4 flex items-center gap-1">
                            <ArrowUpRight size={14} className="text-green-400" /> 
                            <span className="text-green-400">Tăng 14%</span> so với tuần trước
                        </p>
                    </div>
                </div>
            </div>

            {/* Bảng Cảnh báo & Công việc */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Bảng Cảnh báo Tồn kho */}
                <div className="bg-white border border-[#DED6C4] shadow-sm flex flex-col">
                    <div className="p-6 border-b border-[#DED6C4] flex items-center justify-between">
                        <h3 className="font-serif text-lg font-bold text-[#1A202C] flex items-center gap-2">
                            <AlertCircle size={20} className="text-red-700" /> Cảnh Báo Cạn Kiệt Năng Lượng
                        </h3>
                        <Link to="/admin/products" className="text-xs font-bold text-[#4A5568] hover:text-[#1A202C] uppercase tracking-widest">
                            Xem tất cả
                        </Link>
                    </div>
                    <div className="p-0 flex-1">
                        <table className="w-full text-left">
                            <tbody className="font-serif">
                                {lowStockItems.length === 0 ? (
                                    <tr><td className="p-6 text-center text-[#8B8378] italic">Mọi kho chứa đều dồi dào.</td></tr>
                                ) : (
                                    lowStockItems.map((item) => (
                                        <tr key={item.id} className="border-b border-[#DED6C4] last:border-0 hover:bg-[#F8F5EF]">
                                            <td className="p-4 font-bold text-[#1A202C]">{item.name}</td>
                                            <td className="p-4 text-right">
                                                <span className={`px-2 py-1 text-xs font-sans font-bold ${item.stock === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    Còn {item.stock}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bảng Hành động nhanh (Gợi ý UX cho Admin) */}
                <div className="bg-[#EBE7DF] border border-[#DED6C4] shadow-sm p-6">
                    <h3 className="font-serif text-lg font-bold text-[#1A202C] mb-6 border-b border-[#DED6C4] pb-4">
                        Nhiệm Vụ Trong Ngày
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-white p-4 border border-[#DED6C4] flex justify-between items-center hover:shadow-md transition-shadow">
                            <div>
                                <p className="font-bold text-[#1A202C] font-serif">Xét duyệt 5 giao ước mới</p>
                                <p className="text-xs text-[#8B8378] mt-1 font-sans">Có khách hàng đang chờ nhận vật phẩm.</p>
                            </div>
                            <Link to="/admin/orders" className="bg-[#1A202C] text-[#F5F2EB] px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#2C3338]">
                                Xử lý ngay
                            </Link>
                        </div>
                        <div className="bg-white p-4 border border-[#DED6C4] flex justify-between items-center hover:shadow-md transition-shadow">
                            <div>
                                <p className="font-bold text-[#1A202C] font-serif">Bổ sung 3 vật phẩm hết hàng</p>
                                <p className="text-xs text-[#8B8378] mt-1 font-sans">Tránh để khách hàng thất vọng.</p>
                            </div>
                            <Link to="/admin/products" className="border border-[#1A202C] text-[#1A202C] px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#EBE7DF]">
                                Mở kho
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardHome;