import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { Lock, User } from 'lucide-react';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(">>> Đã bấm nút Login với:", { username, password }); // Thêm dòng này để debug
        try {
            const res = await authApi.login({ username, password });
            if (res.authenticated) {
                localStorage.setItem('token', res.token);
                const userInfo = await authApi.getMyInfo();
                localStorage.setItem('userRole', JSON.stringify(userInfo.roles));

                if (userInfo.roles.includes('ADMIN')) {
                    navigate('/admin'); // Vào trang quản trị
                } else {
                    navigate('/products'); // Khách hàng vào xem hàng
                }
                window.location.reload();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const serverMessage = err.response?.data?.message;
                setError(serverMessage || "Tên đăng nhập hoặc mật khẩu không đúng!");
            } else {
                setError("Đã có lỗi xảy ra, vui lòng thử lại sau!");
            }
        }
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="bg-vintage-card p-8 rounded-sm border-2 border-vintage-secondary shadow-[10px_10px_0px_0px_rgba(139,90,43,0.2)] w-full max-w-md">
                <h2 className="text-3xl font-serif text-center text-vintage-primary mb-8 underline decoration-double">
                    Đăng Nhập Sổ Sách
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-vintage-secondary" size={20} />
                        <input
                            type="text"
                            placeholder="Tên tài khoản..."
                            className="w-full bg-transparent border-b-2 border-vintage-secondary p-2 pl-10 focus:outline-none focus:border-vintage-primary font-serif"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-vintage-secondary" size={20} />
                        <input
                            type="password"
                            placeholder="Mật mã..."
                            className="w-full bg-transparent border-b-2 border-vintage-secondary p-2 pl-10 focus:outline-none focus:border-vintage-primary font-serif"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-700 text-sm italic">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-vintage-primary text-vintage-bg py-3 font-bold hover:bg-vintage-text transition-all tracking-widest uppercase"
                    >
                        Vào Cửa Hàng
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;