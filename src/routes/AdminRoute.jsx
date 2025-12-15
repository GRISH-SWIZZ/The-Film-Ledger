import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/common/Loader';

const AdminRoute = () => {
    const { currentUser, isAdmin, loading } = useAuth();

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!currentUser || !isAdmin) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
