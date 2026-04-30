import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FiShieldOff } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UserManagement = () => {

    const [searchText, setSearchText] = useState('')
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`)
            return res.data

        }
    })

    const handleMakeUser = (user) => {
        const roleInfo = { role: 'admin' }

        // Must Asked Confirmation before Proceed
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
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

    const handleRemoveUser = (user) => {
        const roleInfo = { role: 'user' }
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} marked as user`,
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
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e) => setSearchText(e.target.value)} type="search" className="grow" placeholder="Search" />
                </label>
            </div>
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
                                    <td>{user.role === 'admin' ? <button onClick={() => handleRemoveUser(user)} className='btn'><FiShieldOff></FiShieldOff></button > : <button onClick={() => handleMakeUser(user)} className='btn' > <FaUserShield></FaUserShield></button>}</td>
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