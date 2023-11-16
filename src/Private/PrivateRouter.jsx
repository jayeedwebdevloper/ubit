/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { AuthProvider } from '../Context/Context';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthProvider);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }
    if (user) {
        return children;
    }
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
};

export default PrivateRouter;