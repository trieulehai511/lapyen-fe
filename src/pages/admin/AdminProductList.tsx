// src/pages/admin/AdminProductList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, PackageOpen, Loader2 } from 'lucide-react';
import { productApi } from '../../api/productApi';
import type { ProductResponse } from '../../types/product';

// Định dạng tiền tệ O(1) Memory
const priceFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

const AdminProductList: React.FC = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            // Tạm thời hardcode lấy 100 item. Về lâu dài phải làm Component Phân trang!
            const data = await productApi.getProducts(0, 100);
            setProducts(data.items);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadProducts(); }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Ngài có chắc muốn gạch tên thánh tích này khỏi sổ sách không? Hành động này không thể hoàn tác!')) {
            try {
                await productApi.delete(id); // Giả định cậu có hàm này trong productApi
                // Tải lại danh sách sau khi xóa thành công
                loadProducts();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                alert("Xóa thất bại! Có thể vật phẩm này đã nằm trong giao ước (đơn hàng) của ai đó.");
            }
        }
    };

    return (
        // Đã bỏ min-h-screen vì Layout Cha đã lo việc đó
        <div className="bg-white border border-[#DED6C4] p-8 shadow-sm">
            
            {/* Header của bảng */}
            <div className="flex justify-between items-center mb-8 border-b border-[#DED6C4] pb-6">
                <div>
                    <h2 className="text-3xl font-serif text-[#1A202C] flex items-center gap-3 italic">
                        <PackageOpen size={32} className="text-[#8B8378]" /> Sổ Cái Kho Hàng
                    </h2>
                    <p className="text-sm text-[#8B8378] mt-2 font-serif">Quản lý và thống kê toàn bộ thánh tích trong hệ thống.</p>
                </div>
                
                <Link 
                    to="/admin/add-product" 
                    className="bg-[#1A202C] text-[#F5F2EB] px-6 py-3 rounded-sm flex items-center gap-2 hover:bg-[#2C3338] transition-colors uppercase tracking-widest text-xs font-bold shadow-md"
                >
                    <Plus size={16} /> Nhập hàng mới
                </Link>
            </div>

            {/* Khu vực Bảng dữ liệu */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#EBE7DF] text-[#1A202C] font-sans uppercase text-[11px] tracking-widest">
                            <th className="p-4 font-bold border-y border-[#DED6C4]">Sản phẩm</th>
                            <th className="p-4 font-bold border-y border-[#DED6C4]">Phân loại</th>
                            <th className="p-4 font-bold border-y border-[#DED6C4] text-right">Giá bán</th>
                            <th className="p-4 font-bold border-y border-[#DED6C4] text-center">Tồn kho</th>
                            <th className="p-4 font-bold border-y border-[#DED6C4] text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="font-serif">
                        {loading && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-[#8B8378] italic">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <Loader2 className="animate-spin text-[#1A202C]" size={32} />
                                        <span>Đang giở lại sổ sách...</span>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {!loading && products.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-[#8B8378] italic">
                                    Kho hàng trống rỗng. Nhấn "Nhập hàng mới" để thêm sản phẩm đầu tiên.
                                </td>
                            </tr>
                        )}

                        {!loading && products.map((p) => (
                            <tr key={p.id} className="border-b border-[#DED6C4] hover:bg-[#F8F5EF] transition-colors group">
                                <td className="p-4 flex items-center gap-4">
                                    <div className="w-14 h-14 bg-[#1A1A1A] p-1 flex-shrink-0">
                                        <img src={p.imageUrl} className="w-full h-full object-contain" alt={p.name} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#1A202C] text-lg group-hover:text-[#8B8378] transition-colors">{p.name}</p>
                                        <p className="text-xs text-[#8B8378] font-sans tracking-widest uppercase mt-1">{p.unit}</p>
                                    </div>
                                </td>
                                
                                <td className="p-4 text-[#4A5568] italic">{p.categoryName || 'Bí ẩn'}</td>
                                
                                <td className="p-4 text-right font-bold text-[#1A202C]">
                                    {priceFormatter.format(p.price)}
                                </td>
                                
                                <td className="p-4 text-center">
                                    <span className={`px-3 py-1 text-xs font-sans font-bold ${p.stock > 0 ? 'bg-[#EBE7DF] text-[#1A202C]' : 'bg-red-100 text-red-800'}`}>
                                        {p.stock}
                                    </span>
                                </td>
                                
                                <td className="p-4">
                                    <div className="flex justify-center gap-3">
                                        {/* Đã sửa thẻ button bọc thẻ Link thành thẻ Link thuần */}
                                        <Link
                                            to={`/admin/products/edit/${p.id}`}
                                            className="p-2 text-[#4A5568] hover:text-[#1A202C] hover:bg-[#DED6C4] rounded transition-all"
                                            title="Chỉnh sửa"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-all"
                                            title="Loại bỏ"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductList;