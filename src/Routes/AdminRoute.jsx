import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Components/Loading/Forbidden';

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();

    const { role, isLoading } = useRole()

    if (loading || isLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }
    return children
};

export default AdminRoute;