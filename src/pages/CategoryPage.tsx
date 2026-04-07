/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/admin/CategoryPage.tsx
import React, { useEffect, useState } from "react";

import { PlusCircle, Tag, Edit, Trash2, X, Save, Loader2 } from "lucide-react";
import type { Category } from "../types/product";
import { categoryApi } from "../api/categoryApi";

const CategoryPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    
    // State cho việc quản lý Form Nội tuyến (Inline Form)
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: ''
    });

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await categoryApi.getAll();
            setCategories(data);
        } catch (error) {
            console.error("Lỗi tải danh mục", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Mở form Thêm mới
    const handleOpenCreate = () => {
        setEditingId(null);
        setFormData({ name: '', slug: '', description: '' });
        setIsFormOpen(true);
    };

    // Mở form Cập nhật (Điền sẵn data cũ)
    const handleOpenEdit = (cat: Category) => {
        setEditingId(cat.id);
        setFormData({ name: cat.name, slug: cat.slug, description: cat.description || '' });
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingId(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: value,
            ...(name === 'name' && !editingId ? { 
                slug: value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') 
            } : {})
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingId) {
                // await categoryApi.update(editingId, formData);
                console.log("Gọi API Cập nhật:", editingId, formData);
                alert("Đã cập nhật danh mục!");
            } else {
                // await categoryApi.create(formData);
                console.log("Gọi API Tạo mới:", formData);
                alert("Đã thêm danh mục mới!");
            }
            fetchCategories(); // Tải lại danh sách
            handleCloseForm(); // Đóng form
        } catch (error) {
            alert("Lỗi khi lưu danh mục!");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Ngài có chắc muốn xóa phân loại này? Các thánh tích thuộc về nó có thể bị ảnh hưởng!")) {
            try {
                // await categoryApi.delete(id);
                console.log("Gọi API Xóa:", id);
                fetchCategories();
            } catch (error) {
                alert("Xóa thất bại!");
            }
        }
    };

    return (
        <div className="max-w-5xl mx-auto bg-white border border-[#DED6C4] p-8 shadow-sm">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b border-[#DED6C4] pb-6">
                <div>
                    <h2 className="text-3xl font-serif text-[#1A202C] flex items-center gap-3 italic">
                        <Tag size={32} className="text-[#8B8378]" /> Quản lý phân loại
                    </h2>
                    <p className="text-sm text-[#8B8378] mt-2 font-serif">Phân nhóm các vật phẩm trong hệ thống lưu trữ.</p>
                </div>
                
                {!isFormOpen && (
                    <button 
                        onClick={handleOpenCreate}
                        className="bg-[#1A202C] text-[#F5F2EB] px-6 py-3 rounded-sm flex items-center gap-2 hover:bg-[#2C3338] transition-colors uppercase tracking-widest text-xs font-bold shadow-md"
                    >
                        <PlusCircle size={16} /> Thêm mới
                    </button>
                )}
            </div>

            {/* Khối Form Nội Tuyến (Chỉ hiện khi isFormOpen = true) */}
            {isFormOpen && (
                <div className="bg-[#F8F5EF] border border-[#DED6C4] p-6 mb-8 animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-serif font-bold text-[#1A202C] italic">
                            {editingId ? 'Chỉnh sửa Phân loại' : 'Thiết lập Phân loại mới'}
                        </h3>
                        <button onClick={handleCloseForm} className="text-[#8B8378] hover:text-red-600 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#8B8378] mb-1 font-bold">Tên danh mục *</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-[#DED6C4] bg-white p-2 focus:outline-none focus:border-[#1A202C] font-serif" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#8B8378] mb-1 font-bold">Slug (Đường dẫn) *</label>
                                <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full border border-[#DED6C4] bg-white p-2 focus:outline-none focus:border-[#1A202C] font-sans text-sm text-[#4A5568]" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-[#8B8378] mb-1 font-bold">Mô tả chi tiết</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full border border-[#DED6C4] bg-white p-2 focus:outline-none focus:border-[#1A202C] font-serif resize-none" />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={handleCloseForm} className="px-4 py-2 border border-[#DED6C4] text-[#4A5568] hover:bg-[#EBE7DF] text-xs uppercase tracking-widest font-bold transition-colors">
                                Hủy bỏ
                            </button>
                            <button type="submit" disabled={submitting} className="bg-[#1A202C] text-[#F5F2EB] px-6 py-2 flex items-center gap-2 hover:bg-[#2C3338] text-xs uppercase tracking-widest font-bold transition-colors disabled:opacity-50">
                                {submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                {editingId ? 'Cập nhật' : 'Khởi tạo'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Khối Bảng (Table) */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#EBE7DF] text-[#1A202C] font-sans uppercase text-[11px] tracking-widest">
                            <th className="p-4 font-bold border-y border-[#DED6C4]">Tên danh mục</th>
                            <th className="p-4 font-bold border-y border-[#DED6C4]">Đường dẫn (Slug)</th>
                            <th className="p-4 font-bold border-y border-[#DED6C4]">Mô tả</th>
                            <th className="p-4 font-bold border-y border-[#DED6C4] text-center w-24">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="font-serif">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-[#8B8378] italic">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="animate-spin" size={20} /> Đang lật sổ sách...
                                    </div>
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-[#8B8378] italic">
                                    Chưa có phân loại nào được thiết lập.
                                </td>
                            </tr>
                        ) : (
                            categories.map((cat) => (
                                <tr key={cat.id} className="border-b border-[#DED6C4] hover:bg-[#F8F5EF] transition-colors">
                                    <td className="p-4 font-bold text-[#1A202C] text-lg">{cat.name}</td>
                                    <td className="p-4 text-[#8B8378] font-sans text-sm">{cat.slug}</td>
                                    <td className="p-4 text-[#4A5568] italic text-sm">{cat.description || '...'}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => handleOpenEdit(cat)} className="p-2 text-[#4A5568] hover:text-[#1A202C] hover:bg-[#DED6C4] rounded transition-all" title="Chỉnh sửa">
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-all" title="Loại bỏ">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryPage;