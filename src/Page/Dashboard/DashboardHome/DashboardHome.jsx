import React from 'react';
import useRole from '../../../Hooks/useRole';
import AdminHome from './AdminHome';
import RideHome from './RideHome';
import UserHome from './UserHome';
import Loading from '../../../Components/Loading/Loading';

const DashboardHome = () => {
    const { role, roleLoading } = useRole()
    if (roleLoading) {
        return <Loading />
    }

    if (role === 'admin') {
        return <>AdminHome</>
    }
    else if (role === 'rider') {
        return <RideHome />
    }
    else {
        return <UserHome />
    }


};

export default DashboardHome;