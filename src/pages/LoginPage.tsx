import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import axios from 'axios';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const setLoginState = useAuthStore((state) => state.login);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await authApi.login({ username, password });

            if (res.authenticated) {
                localStorage.setItem('token', res.token);
                const userInfo = await authApi.getMyInfo();
                setLoginState(res.token, userInfo.roles);
                await useCartStore.getState().fetchCart();
                navigate(userInfo.roles.includes('ADMIN') ? '/admin' : '/products');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Ten dang nhap hoac mat khau khong dung!');
            } else {
                setError('Da co loi xay ra, vui long thu lai sau!');
            }

            localStorage.removeItem('token');
        }
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="bg-vintage-card p-8 rounded-sm border-2 border-vintage-secondary shadow-[10px_10px_0px_0px_rgba(139,90,43,0.2)] w-full max-w-md">
                <h2 className="text-3xl font-serif text-center text-vintage-primary mb-8 underline decoration-double">
                    Dang Nhap So Sach
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-vintage-secondary" size={20} />
                        <input
                            type="text"
                            placeholder="Ten tai khoan..."
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
                            placeholder="Mat khau..."
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
                        Vao Cua Hang
                    </button>

                    <div className="text-center">
                        <Link to="/register" className="text-vintage-secondary hover:text-vintage-primary italic text-sm underline">
                            Chua co tai khoan? Dang ky tai day
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
