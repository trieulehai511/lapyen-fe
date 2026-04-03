import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore'; 

interface Props {
    requiredRole?: string;
}

const ProtectedRoute: React.FC<Props> = ({ requiredRole }) => {
    // Đọc data từ RAM siêu tốc độ $\mathcal{O}(1)$
    const { isAuthenticated, roles } = useAuthStore(); 

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (requiredRole && !roles.includes(requiredRole)) {
        return <Navigate to="/403" replace />; 
    }

    return <Outlet />;
};

export default ProtectedRoute;