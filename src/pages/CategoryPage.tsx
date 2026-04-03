import { useEffect, useState } from "react"
import { categoryApi } from "../api/categoryApi";
import { PlusCircle, Tag } from "lucide-react";
import type { Category } from "../types/product";

const CategoryPage: React.FC = () =>{
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchCategories = async ()=>{
            try{
                const data = await categoryApi.getAll();
                setCategories(data);
            }catch(error){
                console.error("Lỗi tải danh mục", error);
            }finally {
                setLoading(false);
            }
        };
        fetchCategories();
    },[])

    return(
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8 border-b-2 border-vintage-secondary pb-4">
                <h2 className="text-3xl font-serif text-vintage-primary flex items-center gap-3">
                    <Tag className="h-8 w-8" /> Quản lý phân loại
                </h2>
                <button className="flex items-center gap-2 bg-vintage-primary text-vintage-bg px-4 py-2 rounded-sm hover:bg-vintage-text transition-all">
                    <PlusCircle size={20} /> Thêm mới
                </button>
            </div>
            {loading ? (
                <p className="text-center italic animate-pulse">Đang lật sổ sách...</p>
            ) : (
                <div className="bg-vintage-card shadow-inner border border-vintage-secondary/30 rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-vintage-secondary/20 font-serif text-vintage-primary text-lg border-b border-vintage-secondary/30">
                                <th className="p-4">Tên danh mục</th>
                                <th className="p-4">Slug</th>
                                <th className="p-4">Mô tả</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id} className="border-b border-vintage-secondary/10 hover:bg-vintage-primary/5 transition-colors">
                                    <td className="p-4 font-bold">{cat.name}</td>
                                    <td className="p-4 italic text-vintage-secondary">{cat.slug}</td>
                                    <td className="p-4 text-sm">{cat.description || 'Chưa có mô tả'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
export default CategoryPage;