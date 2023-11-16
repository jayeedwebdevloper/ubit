/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useContext } from 'react';
import { AuthProvider } from '../../Context/Context';
import useAdmin from '../../hook/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Loading/Loading';

const AdminRouter = ({ children }) => {
    const { user, loading } = useContext(AuthProvider);
    const [isAdmin, adminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || adminLoading) {
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
};

export default AdminRouter;