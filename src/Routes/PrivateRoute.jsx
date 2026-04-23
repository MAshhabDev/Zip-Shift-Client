import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};

export default PrivateRoute;