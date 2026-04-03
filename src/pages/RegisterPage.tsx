import { useState} from "react";
import { Lock, User, Mail, UserCircle } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import axios from "axios";

const RegisterPage: React.FC = () =>{

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if(formData.password != formData.confirmPassword){
            setError('Mật mã xác nhận không khớp. Vui lòng kiểm tra lại!');
            return;
        }
        setIsLoading(true);
        try{
            const payload = {
                username: formData.username,
                fullName: formData.fullName,
                password: formData.password,
                email: formData.email
            };
            await authApi.register(payload);
            alert("Đăng ký thành công! Hãy đăng nhập để vào sổ sách.");
            navigate('/login', { replace: true });
        }catch(err){
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Tên tài khoản hoặc email đã tồn tại!");
            } else {
                setError("Hệ thống đang bận, vui lòng quay lại sau!");
            }
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center mt-10 mb-10">
            <div className="bg-vintage-card p-8 rounded-sm border-2 border-vintage-secondary shadow-[10px_10px_0px_0px_rgba(139,90,43,0.2)] w-full max-w-md">
                <h2 className="text-3xl font-serif text-center text-vintage-primary mb-8 underline decoration-double">
                    Ghi Danh Mới
                </h2>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-vintage-secondary" size={20} />
                        <input
                            type="text" name="username" placeholder="Tên tài khoản (viết liền)..."
                            className="w-full bg-transparent border-b-2 border-vintage-secondary p-2 pl-10 focus:outline-none focus:border-vintage-primary font-serif"
                            value={formData.username} onChange={handleChange} required minLength={4}
                        />
                    </div>

                    <div className="relative">
                        <UserCircle className="absolute left-3 top-3 text-vintage-secondary" size={20} />
                        <input
                            type="text" name="fullName" placeholder="Họ và tên..."
                            className="w-full bg-transparent border-b-2 border-vintage-secondary p-2 pl-10 focus:outline-none focus:border-vintage-primary font-serif"
                            value={formData.fullName} onChange={handleChange} required
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-vintage-secondary" size={20} />
                        <input
                            type="email" name="email" placeholder="Thư điện tử (Email)..."
                            className="w-full bg-transparent border-b-2 border-vintage-secondary p-2 pl-10 focus:outline-none focus:border-vintage-primary font-serif"
                            value={formData.email} onChange={handleChange} required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-vintage-secondary" size={20} />
                        <input
                            type="password" name="password" placeholder="Mật mã..."
                            className="w-full bg-transparent border-b-2 border-vintage-secondary p-2 pl-10 focus:outline-none focus:border-vintage-primary font-serif"
                            value={formData.password} onChange={handleChange} required minLength={6}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-vintage-secondary" size={20} />
                        <input
                            type="password" name="confirmPassword" placeholder="Xác nhận lại mật mã..."
                            className="w-full bg-transparent border-b-2 border-vintage-secondary p-2 pl-10 focus:outline-none focus:border-vintage-primary font-serif"
                            value={formData.confirmPassword} onChange={handleChange} required minLength={6}
                        />
                    </div>

                    {error && <p className="text-red-700 text-sm italic">{error}</p>}

                    <button
                        type="submit" disabled={isLoading}
                        className="w-full bg-vintage-primary text-vintage-bg py-3 font-bold hover:bg-vintage-text transition-all tracking-widest uppercase disabled:opacity-50"
                    >
                        {isLoading ? "Đang xử lý..." : "Khắc Dấu Đăng Ký"}
                    </button>
                    
                    <div className="text-center mt-4">
                        <Link to="/login" className="text-vintage-secondary hover:text-vintage-primary italic text-sm underline">
                            Đã có danh phận? Trở về cửa Đăng Nhập
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default RegisterPage;