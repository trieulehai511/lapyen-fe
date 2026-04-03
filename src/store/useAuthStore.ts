import { create } from 'zustand';
interface AuthState{
    token: string | null;
    roles: string[];
    isAuthenticated: boolean;
    login: (token: string, roles: string[]) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token'),
    roles: (() => {
        try {
            const raw = localStorage.getItem('userRole');
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    })(),
    isAuthenticated: !!localStorage.getItem('token'),

    login: (token, roles) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', JSON.stringify(roles));
        set({ token, roles, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        set({ token: null, roles: [], isAuthenticated: false });
        window.location.href = '/login';
    },
}));