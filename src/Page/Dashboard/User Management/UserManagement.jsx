import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FiShieldOff } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UserManagement = () => {

    const axiosSecure = useAxiosSecure()

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data

        }
    })

    const handleMakeUser = (user) => {
        const roleInfo = { role: 'admin' }
        axiosSecure.patch(`/users/$ { user._id }`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} marked as admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }
    return (
        <div>
            <h3>Total Users: {users.length} </h3>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Admin Action</th>
                                <th>Others Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.displayName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.role === 'admin' ? <button className='btn'><FiShieldOff></FiShieldOff></button > : <button onClick={() => handleMakeUser(user)} className='btn' > <FaUserShield></FaUserShield></button>}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {

            }
        </div >
    );
};

export default UserManagement;