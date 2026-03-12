import { Navigate, Outlet } from 'react-router-dom';

interface Props {
    requiredRole?: string;
}

const ProtectedRoute: React.FC<Props> = ({ requiredRole }) => {
    const token = localStorage.getItem('token');
    const userRoleRaw = localStorage.getItem('userRole');
    const roles: string[] = userRoleRaw ? JSON.parse(userRoleRaw) : [];

    if (!token) return <Navigate to="/login" replace />;
    if (requiredRole && !roles.includes(requiredRole)) {
        alert("Bạn không có lệnh bài để vào khu vực này!");
        return <Navigate to="/products" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute