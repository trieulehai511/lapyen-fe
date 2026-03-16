import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, PackageOpen, Loader2 } from 'lucide-react';
import { productApi } from '../../api/productApi';
import type { ProductResponse } from '../../types';

const AdminProductList: React.FC = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const data = await productApi.getProducts(0, 100);
            setProducts(data.items);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadProducts(); }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Ông có chắc muốn gạch tên mặt hàng này khỏi sổ sách không?')) {
            await productApi.delete(id);
            loadProducts();
        }
    };

    return (
        <div className="p-6 bg-vintage-card border-2 border-vintage-primary min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif text-vintage-primary flex items-center gap-3 italic">
                    <PackageOpen /> Sổ Cái Kho Hàng
                </h2>
                <Link to="/admin/add-product" className="bg-vintage-primary text-vintage-bg px-5 py-2 rounded-sm flex items-center gap-2 hover:bg-vintage-text transition-all">
                    <Plus size={20} /> Nhập hàng mới
                </Link>
            </div>

            <div className="overflow-x-auto shadow-xl">
                <table className="w-full text-left border-collapse bg-white/50">
                    <thead>
                        <tr className="bg-vintage-primary text-vintage-bg font-serif uppercase text-sm tracking-widest">
                            <th className="p-4 border border-vintage-primary/20">Sản phẩm</th>
                            <th className="p-4 border border-vintage-primary/20">Phân loại</th>
                            <th className="p-4 border border-vintage-primary/20 text-right">Giá bán</th>
                            <th className="p-4 border border-vintage-primary/20 text-center">Tồn kho</th>
                            <th className="p-4 border border-vintage-primary/20 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="font-sans">
                        {loading && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-vintage-primary italic">
                                    <div className="flex items-center justify-center gap-3">
                                        <Loader2 className="animate-spin" size={20} />
                                        Đang tải danh sách hàng...
                                    </div>
                                </td>
                            </tr>
                        )}

                        {!loading && products.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-vintage-secondary italic">
                                    Chưa có mặt hàng nào. Nhấn "Nhập hàng mới" để thêm sản phẩm đầu tiên.
                                </td>
                            </tr>
                        )}

                        {!loading && products.map((p) => (
                            <tr key={p.id} className="border-b border-vintage-secondary/20 hover:bg-vintage-secondary/5 transition-colors">
                                <td className="p-4 flex items-center gap-3">
                                    <img src={p.imageUrl} className="w-12 h-12 object-cover rounded-sm sepia-[.3]" alt="" />
                                    <div>
                                        <p className="font-bold text-vintage-text">{p.name}</p>
                                        <p className="text-xs text-vintage-secondary italic">{p.unit}</p>
                                    </div>
                                </td>
                                <td className="p-4 text-vintage-primary italic">{p.categoryName}</td>
                                <td className="p-4 text-right font-bold text-vintage-accent">
                                    {p.price.toLocaleString()}đ
                                </td>
                                <td className="p-4 text-center font-mono">{p.stock}</td>
                                <td className="p-4">
                                    <div className="flex justify-center gap-4">
                                        <button className="text-blue-700 hover:scale-110 transition-transform"><Edit size={18} /></button>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="text-red-700 hover:scale-110 transition-transform"
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
