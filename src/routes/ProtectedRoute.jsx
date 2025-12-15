import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/common/Loader';

const ProtectedRoute = () => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!currentUser) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
